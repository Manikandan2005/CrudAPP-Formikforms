import React,{useState,useEffect} from 'react'
import { Form,Button } from 'react-bootstrap'
import { useNavigate,useParams } from 'react-router-dom'
import axios from 'axios'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { BooksURL } from '../App'

function EditBooks() {

  let navigate = useNavigate()
  let params = useParams()
  
  let [initialValues,setValues] = useState({
        title:'',
        authorname:'',
        isbn:'',
        date:''
  })

  const getBook = async()=>{
    try
    {
     let res = await axios.get(`${BooksURL}/${params.id}`)

     if(res.status === 200)
     {
      console.log(res)
        setValues({
          title:res.data.title,
          authorname:res.data.authorname,
          isbn:res.data.isbn,
          date:res.data.date
        })
     }
    }
    catch(error)
    {
        console.log(error)
    }
  }

  const formik = useFormik({
    initialValues:initialValues,
    validationSchema:Yup.object({
      title:Yup.string().required("Enter the title").max(40,"Cannot exceed more than 20 words").min(3,"cannot be less than 3 words"),
      authorname:Yup.string().required("Enter the author name").max(20,"Cannot exceed more than 20 words").min(3,"cannot be less than 3 words"),
      isbn:Yup.number().required("isbn number is required"),
      date:Yup.date().required("date is required")
    }),
    enableReinitialize:true,
    onSubmit:async(values)=>{
      try
      {
        let res = await axios.put(`${BooksURL}/${params.id}`,values)
        if(res.status===200)
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

  useEffect(()=>{
    getBook()
  },[])

  return (
    <>
    <h1 className='d-flex justify-content-center'>
        Edit Book
    </h1>

    <Form className='form' onSubmit={formik.handleSubmit}>
    <Form.Group className="mb-3">
      <Form.Label style={{fontWeight:"bolder"}}>Title</Form.Label>
      <Form.Control type="text" placeholder="Enter Title" id="title" name="title" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.title}/>
      {formik.touched.title && formik.errors.title ? (<div>{formik.errors.title}</div>) : null}
    </Form.Group>
    <Form.Group className="mb-3">
      <Form.Label style={{fontWeight:"bolder"}}>Author Name</Form.Label>
      <Form.Control type="text" placeholder='Enter Author Name' id="authorname" name="authorname" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.authorname}/>
      {formik.touched.authorname && formik.errors.authorname ? (<div>{formik.errors.authorname}</div>) : null}
    </Form.Group>
    <Form.Group className="mb-3">
      <Form.Label style={{fontWeight:"bolder"}}>ISBN Number</Form.Label>
      <Form.Control type='text' placeholder='Enter ISBN Number' id="isbn" name="isbn" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.isbn}/>
      {formik.touched.isbn && formik.errors.isbn ? (<div>{formik.errors.isbn}</div>) : null}
    </Form.Group>
    <Form.Group className="mb-3">
      <Form.Label style={{fontWeight:"bolder"}}>Publication Date</Form.Label>
      <Form.Control type='date'  id="date" name="date" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.date}/>
      {formik.touched.date && formik.errors.date ? (<div>{formik.errors.date}</div>) : null}
    </Form.Group>
    <Button className='Cbutton' type='submit'>Submit</Button>
  </Form>

  
  </>
  )
}

export default EditBooks