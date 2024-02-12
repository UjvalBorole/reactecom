import React, { useEffect, useState } from "react";
import ReactStars from 'react-stars'
import { Link, useParams, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs,addDoc, doc } from "firebase/firestore";
import { auth, storage, db } from "../../firebase/firebase";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBRipple
} from 'mdb-react-ui-kit';



export default function Sliderproductcard(props) {
  const product = props;
  const [successMsg,setSuccessMsg] = useState();
   const [errorMsg,setErrorMsg] = useState();
   const [products,setProducts] = useState([]);

  const GetCurrentUser = () =>{
    const [user, setUser] = useState();
    const usersCollectionRef = collection(db, "users");
  useEffect(()=>{
    auth.onAuthStateChanged(userlogged => {
      if(userlogged){
        const getUsers = async () =>{
          const q = query(collection(db,"users"),where("uid","==",userlogged.uid));
          const data = await getDocs(q);
          setUser(data.docs.map((d)=>({...d.data(),id:d.id})))
        };
        getUsers();
      }else{
        setUser(null);
      }
    })
  },[])
  return user;
}
const loggedinuser = GetCurrentUser();
if(loggedinuser){
  var userid = loggedinuser[0].uid;
}

  const addLike = async()=>{
    if(loggedinuser){
      await addDoc(collection(db,"users",`${loggedinuser[0].uid}`,"Likes"),{
        product,quantity:1
      }).then(()=>{
        setSuccessMsg('Product added to Likes Successfully');
        setTimeout(()=>{
          setSuccessMsg("");
        },3000)
      }).catch((error)=>{
        setErrorMsg(error);
        setTimeout(()=>{
          setErrorMsg("");
        },3000)
      })
    }else{
      setErrorMsg('You need to login first');
    }
   }

   
    useEffect(()=>{
      const getProducts = async() =>{
        const productsArray = [];
        await getDocs(collection(db,"users",`${userid}`,"Likes")).then((querySnapshot)=>{
          querySnapshot.forEach((doc)=>{
            productsArray.push({...doc.data(),id:doc.id})
          })
          setProducts(productsArray)
          console.log(products);
        }).catch((error)=>{
          console.log(error.message); 
        })
      }
      getProducts();
    },[])
   

// console.log("props" ,props);
  return (
    <>
     {successMsg && <div className="text-success">{successMsg}</div>}
      {errorMsg && <div className="text-danger">{errorMsg}</div>}
    <div className="mx-2 my-2" >
        <MDBCard>
        <div className="mask" style={{"height": "50px"}}>
              <div className="d-flex justify-content-start align-items-start h-100 m-2">
                <h6><span className="badge bg-danger pt-1">New</span></h6>
              </div>
            </div>
      <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
        <Link to={`/product/${props.id}/${props.productType}`}>
        <MDBCardImage  src={props.productImage} fluid alt='...' style={{width:"290px", height:"170px"}}/>
          <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
        </Link>
      </MDBRipple>
      <MDBCardBody>
        <MDBCardTitle>{props.productTitle}</MDBCardTitle>
        <div className="card-body p-0 pt-2">
            <button onClick={addLike} className="btn btn-light border px-2 pt-2 float-end icon-hover"><i className="fas fa-heart fa-lg px-1 text-secondary"></i></button>
            <h5 className="card-title">Rs{props.price}</h5>
            <p className="card-text mb-0">{props.productSpec.substring(0,45)}...</p>
            
          </div>
      </MDBCardBody>
    </MDBCard>
    </div>
  </>
  );
}
