import React, { useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import {Link} from 'react-router-dom'

const fileTypes = ["JPG", "PNG", "GIF", "JPEG"];

function MainPage() {



    const [file, setFile] = useState(null);
  
    const handleChange = (file) => {
      setFile(file);
    };
  
    useEffect(()=> {
        console.log(file)
    }, [file])
  
    return (
      <>
      <div className="App">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <a className="navbar-brand" href="#">Admin</a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
  
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <a className="nav-link" href="#">Services <span className="sr-only">(current)</span></a>
        </li>
        <li className="nav-item active ">
          <a className="nav-link" href="/blog">Blog</a>
        </li>
        <li className="nav-item active ">
          <a className="nav-link" href="/gallery">Gallery</a>
        </li>
        {/* <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Dropdown
          </a>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <a className="dropdown-item" href="#">Action</a>
            <a className="dropdown-item" href="#">Another action</a>
            <div className="dropdown-divider"></div>
            <a className="dropdown-item" href="#">Something else here</a>
          </div>
        </li> */}
      </ul>
    </div>
  </nav>
      </div>
  
  
  
      
      <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
  
      <input type="file" accept="image/png, image/jpeg" onChange={(e)=> {console.log(e)}}/>
  
  
  </>
    );
  }

export default MainPage