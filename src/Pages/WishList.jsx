import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs,addDoc,deleteDoc,doc } from "firebase/firestore";
import { auth, storage, db } from "../firebase/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import ReactStars from 'react-stars'
import { usecontext } from "../Context/Context";

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBIcon,
  MDBRipple,
  MDBBtn,
} from "mdb-react-ui-kit";
import List from "./Wishlist/List";

function Wishlist() {
    const [products, setProducts] = useState([]);
    const [successMsg,setSuccessMsg] = useState();
   const [errorMsg,setErrorMsg] = useState();

    // var userid = context.user;
    const {id} = useParams();


      useEffect(()=>{
        const getProducts = async() =>{
          const productsArray = [];
          await getDocs(collection(db,"users",`${id}`,"Likes")).then((querySnapshot)=>{
            querySnapshot.forEach((doc)=>{
              productsArray.push({...doc.data(),docid:doc.id})
              console.log(doc.id);
            })
            setProducts(productsArray)
            console.log(products);
          }).catch((error)=>{
            console.log(error.message); 
          })
        }
        getProducts();
      },[products])

   

   if(products.length != 0)return (

    <MDBContainer fluid>
      {successMsg && <div className="text-success">{successMsg}</div>}
      {errorMsg && <div className="text-danger">{errorMsg}</div>}

      {products.map(({docid,product})=>(
      <List key={product.id} docid={docid} product={product} id={id}/>
      ))}
   
    </MDBContainer>
  )
  else
  return(
<> <br />
    <div className="d-flex align-items-center  justify-content-sm-center justify-content-md-start justify-content-lg-center justify-content-xl-center mb-2">
      <div className="text-warnning col-lg-3 col-md-6 col-sm-6">
      Please Add Some Product In WishList
      </div>
      <Link
      to={"/"}
                          className="btn btn-success border border-secondary px-3"
                          type="button"
                          id="button-addon1"
                          data-mdb-ripple-color="dark"
                        >Back to Home</Link>
                       
    </div>
    <br />
    </>
)
}

export default Wishlist;