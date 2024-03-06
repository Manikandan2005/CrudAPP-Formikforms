import { useFormik } from 'formik'
import React from 'react'
import { Form,Button} from 'react-bootstrap'
import * as Yup from 'yup'
import axios from 'axios'
import { AuthorURL } from '../App'
import { useNavigate } from 'react-router-dom'


function CreateAuthor() {

    let navigate = useNavigate()
    const formik = useFormik({
    initialValues: {
        name:'',
        dob:'',
        shortbio:''
    },

    validationSchema:Yup.object({
        name:Yup.string().required("name is required").max(20,"name cannot exceed 20 characters").min(3,"cannot be less than 3 letters"),
        dob:Yup.date().required("Date of birth is required"),
        shortbio:Yup.string().required("Short bio required").max(300,"Short bio cannot exceed 150 words").min(20,"should be more than 20 letters")
    }),
    
    onSubmit:async(values)=>{
       try
       {
        let res = await axios.post(`${AuthorURL}`,values)
        if(res.status === 201)
        {
          navigate('/')
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
        Create New Author
    </h1>

    <Form className='form' onSubmit={formik.handleSubmit}>
    <Form.Group className="mb-3">
      <Form.Label style={{fontWeight:"bolder"}}>Author name</Form.Label>
      <Form.Control type="text" placeholder="Enter Author Name" id="name" name="name" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name}/>
      {formik.touched.name && formik.errors.name ? (<div>{formik.errors.name}</div>) : null}
    </Form.Group>
    <Form.Group className="mb-3">
      <Form.Label style={{fontWeight:"bolder"}}>Date of Birth</Form.Label>
      <Form.Control type="date" placeholder='Enter Author DOB' id="dob" name="dob" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.dob}/>
      {formik.touched.dob && formik.errors.dob ? (<div>{formik.errors.dob}</div>) : null}
    </Form.Group>
    <Form.Group className="mb-3">
      <Form.Label style={{fontWeight:"bolder"}}>Short Biography</Form.Label>
      <Form.Control as="textarea" rows={5} placeholder='Enter Author DOB' id="shortbio" name="shortbio" type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.shortbio}/>
      {formik.touched.shortbio && formik.errors.shortbio ? (<div>{formik.errors.shortbio}</div>) : null}
    </Form.Group>
    <Button className='Cbutton' type='submit'>Create</Button>
  </Form>

  
  </>
  )
}

export default CreateAuthor