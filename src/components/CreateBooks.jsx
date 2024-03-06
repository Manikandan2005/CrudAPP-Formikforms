import { useFormik } from 'formik'
import React from 'react'
import { Form,Button } from 'react-bootstrap'
import axios from 'axios'
import * as Yup from 'yup'
import { BooksURL } from '../App'
import { useNavigate } from 'react-router-dom'



function CreateBooks() {

  let navigate = useNavigate()

  const formik = useFormik({
    initialValues:{
        title:'',
        authorname:'',
        isbn:'',
        date:''
    },
    validationSchema:Yup.object({
      title:Yup.string().required("Enter the title").max(40,"Cannot exceed more than 20 words").min(3,"cannot be less than 3 words"),
      authorname:Yup.string().required("Enter the author name").max(20,"Cannot exceed more than 20 words").min(3,"cannot be less than 3 words"),
      isbn:Yup.number().required("isbn number is required"),
      date:Yup.date().required("date is required")
    }),

    onSubmit:async(values)=>{
      try
      {
        let res = await axios.post(`${BooksURL}`,values)
        if(res.status===201)
        {
          navigate("/books")
        }
      }
      catch(error)
      {
        console.log(error)
      }
    }
  })


  return (
    <>
    <h1 className='d-flex justify-content-center'>
        Create New Book
    </h1>

    <Form className='form' onSubmit={formik.handleSubmit}>
    <Form.Group className="mb-3">
      <Form.Label style={{fontWeight:"bolder"}}>Book Title</Form.Label>
      <Form.Control type="text" placeholder="Enter Book Title" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.title} id ="title" name="title"/>
      {formik.touched.title && formik.errors.title ? (<div>{formik.errors.title}</div>) : null}
    </Form.Group>
    <Form.Group className="mb-3">
      <Form.Label style={{fontWeight:"bolder"}}>Author</Form.Label>
      <Form.Control type="text" placeholder='Enter Author Name' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.authorname} id="authorname" name="authorname"/>
      {formik.touched.authorname && formik.errors.authorname ? (<div>{formik.errors.authorname}</div>) : null}
    </Form.Group>
    <Form.Group className="mb-3">
      <Form.Label style={{fontWeight:"bolder"}}>ISBN Number</Form.Label>
      <Form.Control type='text' placeholder='Enter the ISBN Number' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.isbn} id="isbn" name="isbn"/>
      {formik.touched.isbn && formik.errors.isbn ? (<div>{formik.errors.isbn}</div>) : null}
    </Form.Group>
    <Form.Group className="mb-3">
      <Form.Label style={{fontWeight:"bolder"}}>Date of Publication</Form.Label>
      <Form.Control type='date' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.date} id="date" name="date"/>
      {formik.touched.date && formik.errors.date ? (<div>{formik.errors.date}</div>) : null}
    </Form.Group>

    <Button className='Cbutton' type='submit'>Create</Button>

  </Form>
  </>
  )
}

export default CreateBooks