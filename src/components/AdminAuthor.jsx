import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { AuthorURL } from '../App'
import axios from 'axios'
import NavBar from './NavBar'
import { useNavigate } from 'react-router-dom'



function AdminAuthor() {

  let [authors,setAuthors] = useState([])
  let navigate = useNavigate()

  const getAuthors = async()=>{
    try
    {
     let res = await axios.get(AuthorURL)

     if(res.status === 200)
     {
        setAuthors(res.data)
     }
    }
    catch(error)
    {
        console.log(error)
    }
  }


  //Delete for author

  const AuthorDelete = async(id)=>{
    try
    {
        let res = await axios.delete(`${AuthorURL}/${id}`)
        if(res.status===200)
        {
            getAuthors()
        }
    }
    catch(error)
    {
        console.log(error)
    }
  }
  useEffect(()=>{
    getAuthors()
  },[])
  
  return <>
    
    <NavBar/>

    <div className='pghead'>
        <h1>Author's Page</h1>
    </div>
    <Table striped bordered hover variant="light" className='tab' >
    <thead>
      <tr>
        <th style={{backgroundColor:"lightblue"}}>S.NO</th>
        <th style={{backgroundColor:"lightblue"}}>Author's Name</th>
        <th style={{backgroundColor:"lightblue"}}>Date of Birth</th>
        <th style={{backgroundColor:"lightblue"}}>Short Biography</th>
        <th style={{backgroundColor:"lightblue"}}>Actions</th>
      </tr>
    </thead>

    <tbody>
    
    {
        authors.map((authors)=>{
            return <tr key={authors.id}>
            <td>{authors.id}</td>
            <td>{authors.name}</td>
            <td>{authors.dob}</td>
            <td style={{width:"600px"}}>{authors.shortbio}</td>
            <td style={{width:"200px"}}>
                
                <Button variant='info' onClick={()=>navigate(`/editauthor/${authors.id}`)}>
                <i className="fa-regular fa-solid fa-pen-to-square fa-beat"  ></i>&nbsp;
                  Edit
                </Button>
                &nbsp;
    
                <Button variant='danger' onClick={()=>AuthorDelete(authors.id)}>
                <i className="fa-sharp fa-solid fa-trash fa-beat" ></i> &nbsp; 
                Delete
                </Button>
            </td>
            </tr>

        })
    }
    </tbody>
  </Table>

    <div className='createWrapper'>
        <Button variant='primary mx-auto' onClick={()=>navigate('/createauthor')}>Click to create new Author</Button>
       
    </div>
  
  </>
  
}

export default AdminAuthor