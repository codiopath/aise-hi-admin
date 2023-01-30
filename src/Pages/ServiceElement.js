import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

function ServiceElement({title, description, image, id, tags}) {

  
  return (
    <>
     <button style={{position: 'absolute', right: '5vw', top: '80px'}} onClick={()=>{
                  axios.delete('https://goel-backend.onrender.com/delete-service', {_id: id})
                  .then(()=>{
                    alert("Service Deleted Successfully")
                    window.location.reload()
                  })
                  .err((err)=>{
                    alert(err)
                  })
                }}>Delete Service</button>
    
    <div style={{marginTop: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom: '50px'}}>
     <h1 style={{textAlign: 'center', textTransform: 'uppercase'}} className='myHeader'>{title}</h1>
     <p>tags : {tags}</p>
     {/* <h1>{id}</h1> */}
     <img src={image} className="card-img-top myImage" alt="..." style={{height: '450px', width: '80%',border: '2px solid #eeeeee', objectFit: 'cover', objectPosition: 'center', marginTop: '20px'}}/>
     <h5 style={{marginTop: '20px', width: '75%', lineHeight: '40px'}} className='myDescription' dangerouslySetInnerHTML={{__html: description}}/>
     </div>
    
    </>
  )
}

export default ServiceElement