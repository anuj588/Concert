import React, { useState } from 'react'
import axios from 'axios'
import '../components/3.css'
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert2'
import { apiUrls, baseUrl } from '../lib/constants'

export default function CustomerRegister() {
  return (
    <div>
      <CustomerTable />
    </div>
  )
}

function CustomerTable() {
  const navigate = useNavigate()
  const [fname, setfname] = useState('')
  const [lname, setlname] = useState('')
  const [email, setemail] = useState('')
  const [phone, setphones] = useState('')
  const [password, setpassword] = useState('')

  const handleForm = (e) => {
    e.preventDefault()
    if (email === '') {
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'please enter valid details!',
      })
    } else if (phone === '') {
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'please enter Contact Number',
      })
    } else if (password === '') {
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'please enter password',
      })
    } else if (password.length < 6 || password.length > 15) {
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Password length is min 6 and max length is 15',
      })
    } else {
      submit()
    }
  }
  const submit = async () => {
    await axios
      .post(baseUrl+apiUrls.REGISTER_URL, {
        userName: fname + ' ' + lname,
        email: email,
        password: password,
        mobile: phone,
      })
      .then((resp) => {
        swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Registered Successfully',
          showConfirmButton: false,
          timer: 1500,
        })
        navigate('/login')
      })
      .catch((error) => {
        swal.fire({
          position: 'center',
          icon: 'error',
          title: error.response.data,
          showConfirmButton: false,
          timer: 1500,
        })
      })
  }

  return (
    <div  >
    <div className='center' style={{marginTop:'38px'}}>
       <h5 className='p-3 text-center bg-info rounded-top bg-gradient text-white' >
       User Registration Form   </h5>
      <form style={{padding:'-3px'}}>
        <div className='user-details'>
          <div className='txt_field' >
            <span className='details' >First Name</span>
            <input
              type='text'
              placeholder='Enter first name'
              value={fname}
              onChange={(e) => setfname(e.target.value)}
              required 
            />
            
          </div>
          <div className='txt_field'>
            <span className='details'>Last Name</span>
            <input
              type='text'
              placeholder='Enter last name'
              value={lname}
              onChange={(e) => setlname(e.target.value)}
              required
            />
          </div>
          <div className='txt_field'>
            <span className='details'>Mobile Number</span>
            <input
              type='text'
              maxLength={10}
              minLength={10}
              placeholder='Enter your number'
              id='mobileNo'
              value={phone}
              onChange={(e) => setphones(e.target.value)}
              required
            />
          </div>

          <div className='txt_field'>
            <span className='details'>Email</span>
            <input
              type='email'
              placeholder='Enter your email'
              id='emailid'
              value={email}
              onChange={(e) => setemail(e.target.value)}
              required
            />
          </div>
          <div className='txt_field'>
            <span className='details'>Password</span>
            <input
              type='password'
              placeholder='Enter your password'
              id='password'
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              required
            />
          </div>
        </div>
        <div className='button' style={{ margin: 'auto' }}>
          <input
            type='submit'
            className='bg-info bg-gradient'
            value='Submit'
            onClick={handleForm}
          />
        </div>
      </form>
    </div>

    </div>

  )
}

