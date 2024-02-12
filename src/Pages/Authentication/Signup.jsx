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
  MDBIcon,
  MDBTextArea
}
from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {auth, db} from "../../firebase/firebase"
import { addDoc, collection } from 'firebase/firestore';


function Signup() {
    const [username,setUsername] = useState();
    const [password,setPassword] = useState();
    const [Conpassword,setConPassword] = useState();
    const [email,setEmail] = useState();
    const [phonenumber,setPhonenumber] = useState();
    const [address,setAddress] = useState();

    const [errorMsg,setErrorMsg] = useState();
    const [successMsg,setSuccessMsg] = useState();

    const navigate = useNavigate();

    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(password == Conpassword){
           console.log(email)
           console.log(password)
          await createUserWithEmailAndPassword(auth, email, password ).then((usercredentail)=>{
            const initialCartValue = 0;
            const user = usercredentail.user;
            addDoc(collection(db,"users"),{
                username:username,
                password:password,
                phonenumber:phonenumber,
                email:email,
                address:address,
                cart: initialCartValue,
                uid:user.uid  
            }).then(()=>{
                setSuccessMsg("New user added Successfully ,You will now be automatically redirected to login page")
                setUsername("")
                setEmail("")
                setConPassword("")
                setAddress("")
                setErrorMsg("")
                setPassword("")
                setPhonenumber("")
                setTimeout(()=>{
                    setSuccessMsg("")
                    navigate('/signin')
                },4000);
            })
            .catch((error)=>{setErrorMsg(error.message)});
        }).catch((error)=>{
            if(error.message == "Firebase: Error (auth/invalid-email)."){
                setErrorMsg("Please fill all required fields")
            }
        })
    }else{
            setErrorMsg("Password has no Match");
        }

    
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
           <h4 className="text-center mb-4">SignUp</h4>
           {successMsg && <><div className="text-success">{successMsg}</div></>}
           {errorMsg && <><div className="text-danger">{errorMsg}</div></>}
            <form action="" onSubmit={handleSubmit}>
            <MDBInput wrapperClass='mb-4' label='Full Name' id='form1' type='text' onChange={(e)=>setUsername(e.target.value)}/>
              <MDBInput wrapperClass='mb-4' label='Email' id='form1' type='email' onChange={(e)=>setEmail(e.target.value)}/>
              <MDBInput wrapperClass='mb-4' label='Phone Number' id='form1' type='text' onChange={(e)=>setPhonenumber(e.target.value)}/>
              <MDBInput wrapperClass='mb-4' label='Password' id='form1' type='password' onChange={(e)=>setPassword(e.target.value)}/>
              <MDBInput wrapperClass='mb-4' label='Confirm Password' id='form1' type='password' onChange={(e)=>setConPassword(e.target.value)}/>
              <MDBTextArea wrapperClass='mb-4' label='Address' id='form1' type='text' onChange={(e)=>setAddress(e.target.value)}/>
              <div className="">
              <p>Already have an Account ? 
                <Link to="signip">SignIn</Link></p>
              </div>
              <MDBBtn className='w-100 mb-4' size='md'>sign up</MDBBtn>
              </form>

              <div className="text-center">

                <p>or sign up with:</p>

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

export default Signup;