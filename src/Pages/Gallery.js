import React, { useEffect, useState } from 'react'

import Modal from 'react-modal';

import './App.css'
import './Gallery.css'

import axios from 'axios';

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

import {Link} from 'react-router-dom'

import {storage} from './firebase'
import {ref, uploadBytes, listAll, getDownloadURL} from 'firebase/storage'
import {v4} from 'uuid'

const modules = {
  toolbar: [
    [{ 'header': [1, 2, false] }],
    ['bold', 'italic', 'underline','strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image'],
    ['clean']
  ],
}

const  formats = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image'
]

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  },
};

Modal.setAppElement('#root');




function Gallery() {

    const [vidHeight, setVidHeight] = useState('1px')
    const [vidButtonText, setVidButtonText] = useState("Show Video")

    const [load, setLoad] = useState('flex')

    const [myDisplayOne, setMyDisplayOne] = useState('block')

    const [video, setVideo] = useState('')
    const [image, setImage] = useState('')

    const [imageData, setImageData] = useState('')
    const [videoData, setVideoData] = useState('')

    const [imageUpload, setImageUpload] = useState(null)

    const [toHit, setToHit] = useState(0)

    const id = "63c41bad03e8451f578bdf38"

    useEffect(()=>{
        axios.get(`https://goel-backend.onrender.com/get-gallery-images`)
        .then((res)=> {
            setImageData(res.data)
          })
          
          axios.get(`https://goel-backend.onrender.com/get-gallery-video`)
          .then((res)=> {
            const response = res.data.length -1
            setVideoData(res.data[response])
            console.log(response)
        })


    }, [])


    // ---- For Modal -----

  
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  

  function closeModal() {
    setIsOpen(false);
  }
    

  const submitVideo = () => {
    axios.post('https://goel-backend.onrender.com/add-gallery-video', {video})
    .then((res)=>{
      console.log(res)
      alert('Video Added Successfully')
      window.location.reload();
    })
    .catch((err)=>{
      alert(err)
    })
  }


  const imageListRef = ref(storage, "gallery/")

  const submitImage = () => {


    if(!imageUpload){
      alert("Please choose the image first")
  }
  else if(imageUpload == null) return;
  else if(imageUpload.type === "image/jpeg" || imageUpload.type === "image/jpg" || imageUpload.type === "image/png" || imageUpload.type === "image/gif"){
    const uniqueId = imageUpload.name + v4()
    const finalId = uniqueId
    const imageRef = ref(storage, `gallery/${finalId}`)
    uploadBytes(imageRef, imageUpload).then(()=>{

      getDownloadURL(ref(storage, `gallery/${finalId}`))
  .then((url) => {
    axios.post('https://goel-backend.onrender.com/add-gallery-image', {image: url})
    .then((res)=>{
      alert('Image Added Successfully')
      window.location.reload();
    })
    .catch((err)=>{
      alert(err)
    })
  })

    })
  }

  }






  return (
    <div style={{display: myDisplayOne}}>
    
   
         <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <a className="navbar-brand" href="#">Admin</a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
  
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/hero">Hero-Section <span className="sr-only">(current)</span></Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/services">Services <span className="sr-only">(current)</span></Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/blog">Blog</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" to="/gallery">Gallery</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/doctors">Our Doctors</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/reports">Reports</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/appointment">Appointments</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/contact">Contact Us</Link>
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

      <div style={{display: 'flex', justifyContent: 'flex-end', paddingRight: '6vw', marginTop: '30px'}}>
  <button className='videoButton' onClick={()=>{
    if(vidHeight === '1px'){
        setVidHeight('500px')
        setVidButtonText('Hide Video')
    }
    else{
        setVidHeight('1px')
        setVidButtonText('Show Video')
    }
  }}>{vidButtonText}</button>
  <i className="fa-solid fa-square-plus" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{fontSize: '40px'}} onClick={openModal}></i>

  {/* Modal by me */}

  <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        
        <i class="fa-solid fa-xmark closeModdal" onClick={closeModal}></i>
        <div style={{display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center'}}>
          <h1>Add Gallery Video</h1>
          <input type='text' className='myInputClass' name='video' placeholder='Enter Video URL' value={video} onChange={(e)=> {setVideo(e.target.value)}}/>
          <button className='submit' onClick={submitVideo}>Submit</button>

          <h1 style={{marginTop: '40px'}}>Add Gallery Image</h1>

          <input type='file' className='myInputClass' onChange={(e)=>{setImageUpload(e.target.files[0])}}/>


        <button className='submit' onClick={submitImage}>Submit</button>
        </div>

        
      </Modal>
    </div>

  {/* ----XXXXXXX------ */}
      </div>


      {/* ---- For Video ----- */}

      {
        videoData 
        ?

    <div className='videoStyle'>
         <video width="400" controls autoPlay loop muted src={videoData.video} className='videoElement' style={{height: vidHeight}}>
         </video>
    </div>
    :
    <h3 style={{marginLeft: '10vw'}}>No Video Available</h3>
      }
     

    {/* ------ For Pics ----- */}


        <h1 style={{textAlign: 'center', marginTop: '20px', fontWeight: '600', letterSpacing: '.5px', fontSize: '60px', color: '#111', textShadow: '3px 4px #22222260'}}>Our Gallery</h1>
        <div className='forPics'>
    {
      imageData.length > 0 
      ?
      imageData.map((obj)=>{
        return(


            <div style={{width: '30%'}} className='forHover'>
                <i className="fa-solid fa-trash" id='testDel' onClick={()=>{
                  axios.post('https://goel-backend.onrender.com/delete-gallery-image', {image: obj.image})
                  .then(()=>{
                    alert("Image Deleted Successfully")
                    window.location.reload()
                  })
                  .err((err)=>{
                    alert(err)
                  })
                }}></i>
                 <img src={obj.image}/>
            </div>
            
           
            
            
            )
          })
          :
          <h3 style={{marginLeft: '10vw', marginTop: '40px'}}> No Image Available</h3>
        }
        </div>



    {/* ------ XXXXXXX -------- */}


      </div>



   

        
        </div>
  )
}

export default Gallery