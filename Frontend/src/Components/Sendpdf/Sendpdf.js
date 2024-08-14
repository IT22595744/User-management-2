import React, { useEffect, useState } from "react";
import axios from "axios";
// import Nav from "../Nav/Nav";
// import Pdfcomp from "./Pdfcomp";
import './pdf.css';
// import { pdfjs } from 'react-pdf';


// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   'pdfjs-dist/build/pdf.worker.min.mjs',
//   import.meta.url,
// ).toString();

function Sendpdf() {
  //for the input fields set the states
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const [allImage, setAllImage] = useState(null);
  // const [pdfFile,setPDFFile]=useState(null);

  // useEffect(() => {
  //   getpdf();
  // }, []);
  // console.log("hi");
  // //implementing the pdf get function
  // const getpdf = async () => {
  //   try {
  //     const result = await axios.get("http://localhost:5000/getFile");
  //     console.log(result.data.data);
  //     setAllpdf(result.data.data);
  //     console.log("abc");
  //   } catch (error) {
  //     console.error("Error fetching PDFs:", error);
  //     alert("Error fetching PDFs");
  //   }
  // };

  // //implementing the function what should happen when submmiting
  // // const submitpdf = async (e) => {
  // //   e.preventDefault();

  // //   const formData = new FormData();
  // //   formData.append("title", title);
  // //   formData.append("file", file);
  // //   console.log(title, file);
  // //   console.log("aaa");
  // //   try {
  // //     const result = await axios.post(
  // //       "http://localhost:5000/uploadfile",
  // //       formData,
  // //       {
  // //         headers: { "Content-Type": "multipart/form-data" },
  // //       }
        
  // //     );
  // //     console.log(result);
  // //     if (result.data.status === 200) {
  // //       alert("Uploaded success");
  // //       getpdf();
  // //     } else {
  // //       alert("Uploaded error");
  // //     }
  // //   } catch (error) {
  // //     console.error("Error Uploading : " ,error);
  // //     alert("Error uploading");
  // //   }
  // //   console.log("abc");
  // // };

  const showpdf=(pdf)=>{
    //we want open it in another tab so we use window.open
    window.open(`http://localhost:5000/files/${pdf}`,"_blank","noreferrer");
  }
  
  //function to get the pdf file from mongodb
  useEffect (()=>{
    getpdf();
  }, []);
  const getpdf=async()=>{
    //calling the api
    const result=await axios.get("http://localhost:5000/get-files");
    console.log(result.data.data);
    //set the variable data to state
    setAllImage(result.data.data);
  };

  


  // new code function
  //creating a function submitimg
  const submitimg=async (e) =>{
    //preventfrom reloading app,calling that function
    e.preventDefault();
    //creating object to the form data
    const formData=new FormData();
    formData.append("file",file);
    formData.append("title",title);
    //output the input variables on the console
    console.log(title,file);

    //craeting a variable result
    const result=await axios.post("http://localhost:5000/upload-files",
      formData,
      {
        //define that we are sending the file below headers
         headers:{"Content-Type":"mutipart/form-data"},
      }
    );
    console.log('result',result);
    if(result.status===200)
    {
      alert("Uploaded successfully!!!");
      await getpdf();
    }
  };

  return (
    <div className="App" >
 <form className="formstyle" onSubmit={submitimg}>
    <h4>Upload Pdf In React</h4><br></br>
   <input type="text" className="form-control" placeholder="Title" required 
   onChange={(e)=>setTitle(e.target.value)}>
    </input><br/><br></br>
   <input type="file" className="form-control" accept="application/pdf" required
    onChange={(e)=>setFile(e.target.files[0])}/><br></br>
   <button className="btn btn-primary" type="submit">Submit</button>
</form>
  <div className="uploaded">
    <h4>Uploaded PDF:</h4>
    <div className="output-div">
      {allImage==null?"":allImage.map((data)=>{
      return(
      <div className="inner-div">
        <h6>Title:{data.title}</h6>
        <button className="btn btn-primary" onClick={()=>showpdf(data.pdf)}>Show Pdf</button>
      </div>
      )
    })}
    </div>
  </div>
    </div>
  );
}

export default Sendpdf;
