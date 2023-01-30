import React, { useEffect, useState } from 'react'

import Modal from 'react-modal';

import './App.css'

import axios from 'axios';
import BlogElement from './BlogElement';

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



function Reports() {

    const [testData, setTestData] = useState(null)

    const [load, setLoad] = useState('flex')

    const [myDisplayOne, setMyDisplayOne] = useState('block')
    const [myDisplayTwo, setMyDisplayTwo] = useState('none')

    const [blogId, setBlogId] = useState("")

    const [blogImage, setBlogImage] = useState('')

    const [blogDescription, setBlogDescription] = useState('')

    const [blogTitle, setBlogTitle] = useState("second-section")

    const [sendBlogTitle, setSendBlogTitle] = useState('')
    const [sendBlogDescription, setSendBlogDescription] = useState('')
    const [sendBlogImage, setSendBlogImage] = useState('')

    const [imageUpload, setImageUpload] = useState(null)

    const id = "63c41bad03e8451f578bdf38"

    const [patientName, setPatientName] = useState('')
    const [patientId, setPatientId] = useState('')

    useEffect(()=>{
        axios.get(`https://goel-backend.onrender.com/get-reports`)
        .then((res)=> {
            setTestData(res.data)
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
    
  const submitBlog = () => {


    if(!patientName || !imageUpload || !patientId){
        alert("Please enter all the fields")
    }
    else if(imageUpload == null) return;
    const uniqueId = imageUpload.name + v4()
    const finalId = uniqueId
    const imageRef = ref(storage, `patientReport/${finalId}`)
    uploadBytes(imageRef, imageUpload).then(()=>{

      getDownloadURL(ref(storage, `patientReport/${finalId}`))
  .then((url) => {
    axios.post('https://goel-backend.onrender.com/add-report', {patientName, reportFile: url, patientId})
    .then((res)=>{
        if(res.status === 200){
      alert('Report Added Successfully')
        }
      window.location.reload();
    })
    .catch((err)=>{
      alert(err)
    })
  })

    })




    
  }
    
      return(
        <div id='root'>
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
          <Link className="nav-link" to="/gallery">Gallery</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/doctors">Our Doctors</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" to="/reports">Reports</Link>
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
          <h1>Add a Report</h1>
          <input type='text' className='myInputClass' name='name' placeholder='Enter The Name of Patient' value={patientName} onChange={(e)=> {setPatientName(e.target.value)}}/>
          <input type='text' className='myInputClass' name='patientId' placeholder='Enter The Unique ID of patient' value={patientId} onChange={(e)=> {setPatientId(e.target.value)}}/>

        <h4 style={{marginTop: '20px'}}>Choose Report File</h4>
          <input type='file' className='myInputClass' onChange={(e)=>{setImageUpload(e.target.files[0])}}/>

         




        <button className='submit' onClick={submitBlog}>Submit</button>
        </div>

        
      </Modal>
    </div>

  {/* ----XXXXXXX------ */}
      </div>

      </div>



      <div className='cardClass'>

    




{
   
   testData && testData.length > 0
   ?     
        testData.map((obj)=> {
            return(
                <>
                <div className="card">
                <i className="fa-solid fa-trash" id='testDel' style={{position: 'absolute', top: '-70px'}} onClick={()=>{
                  axios.delete('https://goel-backend.onrender.com/delete-report', {_id: obj._id})
                  .then(()=>{
                    alert("Report Deleted Successfully")
                    window.location.reload()
                  })
                  .err((err)=>{
                    alert(err)
                  })
                }}></i>
      <div className="card-body">
        <h5 className="card-title" style={{textTransform: 'uppercase'}}>{`${obj.patientName}`}</h5>
        
        <p className="card-text">{obj.patientId}</p>
        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
    
    <a target='_blank' className="btn btn-primary" href={obj.reportFile}>Download Report</a>

    </div>
      </div>
    </div>
    </>
            )
        })

        : 

<>
        {/* {setTimeout(()=>{
        <div> Loading...</div>

        }, 5000)} */}
        <h1 style={{paddingLeft: '20px'}}>No Reports Found</h1>
        </>

    

}


</div>

        
        </div>


 
        </div>
      )
    

   
  
  
}

export default Reports
