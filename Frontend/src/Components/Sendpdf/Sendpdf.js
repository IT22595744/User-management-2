import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "../Nav/Nav";
import Pdfcomp from "./Pdfcomp";
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

function Sendpdf() {
  //for the input fields set the states
  const [title, setTitle] = useState("");
  const [file, saveFile] = useState("");
  const [allpdf, setAllpdf] = useState(null);
  const [pdfFile,setPDFFile]=useState(null);

  useEffect(() => {
    getpdf();
  }, []);
  console.log("hi");
  //implementing the pdf get function
  const getpdf = async () => {
    try {
      const result = await axios.get("http://localhost:5000/getFile");
      console.log(result.data.data);
      setAllpdf(result.data.data);
      console.log("abc");
    } catch (error) {
      console.error("Error fetching PDFs:", error);
      alert("Error fetching PDFs");
    }
  };

  //implementing the function what should happen when submmiting
  const submitpdf = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);
    console.log(title, file);
    console.log("aaa");
    try {
      const result = await axios.post(
        "http://localhost:5000/uploadfile",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
        
      );
      console.log(result);
      if (result.data.status === 200) {
        alert("Uploaded success");
        getpdf();
      } else {
        alert("Uploaded error");
      }
    } catch (error) {
      console.error("Error Uploading : " ,error);
      alert("Error uploading");
    }
    console.log("abc");
  };

  const showpdf=(pdf)=>{
    setPDFFile(`http://localhost:5000/files/${pdf}`);
  }
  return (
    <div style={{backgroundColor:"#35868f",height: "100vh" }}>
      <Nav />
      <div style={{textAlign:"center"}}>
      <h1>Send Pdf</h1>
      <br></br>
      <form onSubmit={submitpdf} >
        <label>Pdf Title</label>
        <br></br>
        <input
          type="text"
          required
          onChange={(e) => setTitle(e.target.value)}
          style={{ backgroundColor: "#cfd1cd",
            width: "300px",
            height: "25px"}}
        ></input>
        <br></br>
        
        <label style={{textAlign:"left"}}>Select Pdf Title</label>
        <br></br>
        <input
          type="file"
          accept="application/pdf"
          required
          onChange={(e) => saveFile(e.target.files[0])}
        ></input>
        <br></br>
        <br></br>
        <button class="btn btn-danger">Submit</button>
      </form>
      <div style={{margin:"center"}}>
        <h4 style={{marginRight:"1px"}}>Pdf Details</h4>
        {allpdf === null
        ? ""
      :allpdf.map((data)=>(
        <div key={data._id}>
          <h1>Title.{data.title}</h1>
          <button onClick={()=>showpdf(data.pdf)}>Show Pdf</button>
          </div>
      ))}
      </div>
      <Pdfcomp pdfFile={pdfFile}/>
      </div>
    </div>
  );
}

export default Sendpdf;
