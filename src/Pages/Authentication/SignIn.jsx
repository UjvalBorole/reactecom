import React, { useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
  MDBIcon
}
from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {auth, db} from "../../firebase/firebase"


function SignIn() {
  const navigate = useNavigate();

    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    
    const [successMsg,setSuccessMsg] = useState();
    const [errorMsg,setErrorMsg] = useState()

    const handleSubmit = async(e)=>{
      e.preventDefault();
      await signInWithEmailAndPassword(auth,email,password).then((usercredential)=>{
        setSuccessMsg("Logged in successfully, you will be redirected to home page");
        setEmail("")
        setPassword("")
        setErrorMsg("")
        setTimeout(()=>{
          setSuccessMsg("");
            navigate("/");
        },3000);
      }).catch((error)=>{
        const errorCode = error.code;
        console.log(error.message);
        if(error.message == "Firebase: Error (auth/invalid-email)."){
          setErrorMsg("Please Fill all required fields.")
        }
        if(error.message == "Firebase: Error (auth/user-not-found)."){
          setErrorMsg("Email not found.")
        }
        if(error.message == "Firebase: Error (auth/invalid-login-credentials)."){
          setErrorMsg("Invalid Credentails")
        }
        if(error.message == "Firebase: Error (auth/wrong-password)."){
          setErrorMsg("Wrong Password")
        }
      })
    }

  return (
    <MDBContainer fluid className='p-4'>

      <MDBRow>

        <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>

          <h1 className="my-5 display-3 fw-bold ls-tight px-3">
            The best offer <br />
            <span className="text-primary">for your business</span>
          </h1>

          <p className='px-3' style={{color: 'hsl(217, 10%, 50.8%)'}}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Eveniet, itaque accusantium odio, soluta, corrupti aliquam
            quibusdam tempora at cupiditate quis eum maiores libero
            veritatis? Dicta facilis sint aliquid ipsum atque?
          </p>

        </MDBCol>

        <MDBCol md='6'>
            <MDBContainer style={{"maxWidth":"70%"}}>
          <MDBCard className='my-5 '>
            <MDBCardBody className='p-5'>
           <h4 className="text-center mb-4">SignIn</h4>
           {successMsg && <><div className="text-success">{successMsg}</div></>}
           {errorMsg && <><div className="text-danger">{errorMsg}</div></>}

            <form action="" onSubmit={handleSubmit}>
              <MDBInput wrapperClass='mb-4' label='Email' id='form1' type='email' onChange={(e)=>setEmail(e.target.value)}/>
              <MDBInput wrapperClass='mb-4' label='Password' id='form1' type='password' onChange={(e)=>setPassword(e.target.value)}/>

              <div className="">
              <p>Not have an Account?
                <Link to="signup">SignUp</Link></p>
              </div>

              <MDBBtn className='w-100 mb-4' size='md'>Sign In</MDBBtn>
              </form>
              <div className="text-center">

                <p>or sign up with:</p>

                <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon='facebook-f' size="sm"/>
                </MDBBtn>

                <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon='twitter' size="sm"/>
                </MDBBtn>

                <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon='google' size="sm"/>
                </MDBBtn>

                <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon='github' size="sm"/>
                </MDBBtn>

              </div>

            </MDBCardBody>
          </MDBCard>
          </MDBContainer>

        </MDBCol>

      </MDBRow>

    </MDBContainer>
  );
}

export default SignIn;