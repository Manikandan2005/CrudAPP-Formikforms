import React, { useState,useEffect } from 'react'
import { Table,Button } from 'react-bootstrap'
import { BooksURL } from '../App'
import NavBar from './NavBar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


function AdminBooks() {

    let [books,setBooks] = useState([])
    let navigate = useNavigate()

    const getBooks = async()=>{
    try
    {
        let res = await axios.get(BooksURL)
        if(res.status === 200)
        {
            setBooks(res.data)
        }
    }
    catch(error)
    {
        console.log(error)
    }
    }

    
    const BookDelete = async(id)=>
    {
        try
        {
            let res = await axios.delete(`${BooksURL}/${id}`)
            if(res.status===200)
            {
                
                getBooks()
            }
        }
        catch(error)
        {
            console.log(error)
        }
    }

    useEffect(()=>{
    getBooks()
    },[])

  return <>

  <NavBar/>
  <div className='pghead'>
        <h1>Books Page</h1>
    </div>
  <Table striped bordered hover variant="light" className='tab'>
  <thead>
    <tr>
      <th style={{backgroundColor:"lightblue"}}>Title</th>
      <th style={{backgroundColor:"lightblue"}}>Author's Name</th>
      <th style={{backgroundColor:"lightblue"}}>ISBN Number</th>
      <th style={{backgroundColor:"lightblue"}}>Publication Date</th>
      <th style={{backgroundColor:"lightblue"}}>Actions</th>
    </tr>
  </thead>

  <tbody>
    {
        books.map((books,i)=>{
            return   <tr key={i}>
            <td>{books.title}</td>
            <td>{books.authorname}</td>
            <td>{books.isbn}</td>
            <td>{books.date}</td>
            <td>
                <Button variant='info' onClick={()=>navigate(`/editbooks/${books.id}`)}>
                <i className="fa-regular fa-solid fa-pen-to-square fa-beat" ></i>&nbsp;
                    Edit
                </Button>
                &nbsp;
                <Button variant='danger' onClick={()=>BookDelete(books.id)}>
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
        <Button variant='primary mx-auto' onClick={()=>navigate('/createbook')}>Click to add new book</Button>
    </div>
</>
}

export default AdminBooks