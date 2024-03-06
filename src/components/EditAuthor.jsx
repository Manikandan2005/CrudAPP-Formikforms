import React, { useState,useEffect } from 'react'
import { Form,Button } from 'react-bootstrap'
import { useNavigate,useParams } from 'react-router-dom'
import axios from 'axios'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { AuthorURL } from '../App'


function EditAuthor() {
  
  let navigate = useNavigate()
  let params = useParams()
  
  let [initialValues,setValues] = useState({
    name:'',
    dob:'',
    shortbio:''
  })

  const getAuthor = async()=>{
    try
    {
     let res = await axios.get(`${AuthorURL}/${params.id}`)

     if(res.status === 200)
     {
        console.log(res)
        setValues({
          name:res.data.name,
          dob:res.data.dob,
          shortbio:res.data.shortbio,
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
      name:Yup.string().required("name is required").max(20,"name cannot exceed 20 characters").min(3,"cannot be less than 3 letters"),
      dob:Yup.date().required("Date of birth is required"),
      shortbio:Yup.string().required("Short bio required").max(300,"Short bio cannot exceed 150 words").min(20,"should be more than 20 letters")
    }),
    enableReinitialize:true,
    onSubmit:async(values)=>{
      try
      {
        let res = await axios.put(`${AuthorURL}/${params.id}`,values)
        if(res.status===200)
        {
          navigate("/")
        }
      }
      catch(error)
      {
        console.log(error)
      }
    }
  })

  useEffect(()=>{
    getAuthor()
  },[])

  return (
    <>
    <h1 className='d-flex justify-content-center'>
        Edit Author
    </h1>

    <Form className='form' onSubmit={formik.handleSubmit}>
    <Form.Group className="mb-3">
      <Form.Label style={{fontWeight:"bolder"}}>Author Name</Form.Label>
      <Form.Control type="text" placeholder="Enter Author Name" id="name" name="name" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name}/>
      {formik.touched.name && formik.errors.name ? (<div>{formik.errors.name}</div>) : null}
    </Form.Group>
    <Form.Group className="mb-3">
      <Form.Label style={{fontWeight:"bolder"}}>Enter Author DOB</Form.Label>
      <Form.Control type="date" placeholder='Enter Author DOB' id="dob" name="dob" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.dob}/>
      {formik.touched.dob && formik.errors.dob ? (<div>{formik.errors.dob}</div>) : null}
    </Form.Group>
    <Form.Group className="mb-3">
      <Form.Label style={{fontWeight:"bolder"}}>Short bio</Form.Label>
      <Form.Control type='text' placeholder='Enter Short bio' id="shortbio" name="shortbio" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.shortbio}/>
      {formik.touched.shortbio && formik.errors.shortbio ? (<div>{formik.errors.shortbio}</div>) : null}
    </Form.Group>
    <Button className='Cbutton' type='submit'>Submit</Button>
  </Form>

  
  </>
  )
}

export default EditAuthor