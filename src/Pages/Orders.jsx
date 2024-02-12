import React, { useEffect, useState } from "react";
import ReactStars from "react-stars";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs, addDoc,doc } from "firebase/firestore";
import { auth, storage, db } from "../firebase/firebase";
import CartData from "./CartComponent/CartData";
import { usecontext } from "../Context/Context";
import toast, { Toaster } from 'react-hot-toast';
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";

export default function Orders() {
  const [product, setProducts] = useState([]);
  const [cxl, setCxl] = useState(0);
  const context = usecontext();
// console.log(context.user);
let c =0;

if(context.user){
  const userid = context.user;
  // console.log(userid);
  useEffect(()=>{
      const getProducts = async() =>{
        const productsArray = [];
        const path = collection(db,"users",userid,"orders");
        await getDocs(path).then((querySnapshot)=>{
          querySnapshot.forEach((doc)=>{
            productsArray.push({...doc.data(),id:doc.id})
          })
          setProducts(productsArray)
          // console.log(products);
        }).catch((error)=>{
          console.log(error.message); 
        })
      }
      getProducts();
    
    },[setCxl,cxl])
  }

  const convertDate=(str,day)=>{
    // Initial date string
var dateString = str;

// Parse the initial date string
var initialDate = new Date(dateString);

// Check if the initialDate is valid
if (!isNaN(initialDate)) {
    // Add 5 days to the initial date
    var resultDate = new Date(initialDate);
    resultDate.setDate(initialDate.getDate() + day);

    // Format the resultDate as a string (e.g., "Oct 22, 2023")
    var resultDateString = resultDate.toDateString(); // You can use toLocaleDateString() for a more localized format

    return resultDateString;
} else {
    console.log("Invalid date string");
}

  }

  let cnt = 0;
  product.map(({data,date})=>(
    data.map(({data,quantity})=>(
      cnt+=1
    ))))
    let i= 4;
    while(i--){
    setTimeout(()=>{
      c+=1;
      setCxl(c);
    },3000);
  }
  if(product.length != 0)return (
      <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol>
              <MDBCard>
                <MDBCardBody className="p-4">
                  <MDBRow>
                    <MDBCol >
                      <MDBTypography tag="h5">
                        <a href="#!" className="text-body">
                          <MDBIcon fas icon="long-arrow-alt-left me-2" /> Your Orders
                        </a>
                      </MDBTypography>
      
                      <hr />
      
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <div>
                          <p className="mb-1">Shopping cart</p>
                          <p className="mb-0">You have {cnt} items in your cart</p>
                        </div>
                        <div>
                          {/* <p>
                            <span className="text-muted">Sort by:</span>
                            <a href="#!" className="text-body">
                              price
                              <MDBIcon fas icon="angle-down mt-1" />
                            </a>
                          </p> */}
                        </div>
                      </div>
      
                      {product.map(({data,date,id})=>(
                      data.map(({data,quantity})=>(
                      <MDBCard className="mb-3">
                        <MDBCardBody>
                          <div className="d-flex justify-content-between">
                            <Link to={`/order/${id}`}>
                            <div className="d-flex flex-row align-items-center mx-2">
                              <div>
                                <MDBCardImage
                                  src={data.productImage}
                                   className="rounded-3" style={{ width: "65px" }}
                                  alt="Shopping item" />
                              </div>
                              <div className="ms-3 "  >
                                <MDBTypography tag="h5">
                                  {data.productTitle}
                                </MDBTypography>
                                <p className="small mb-0">{data.brand},warrenty:{data.warrenty}</p>
                              </div>
                            </div>
                            </Link>
                            <div className="d-flex flex-row align-items-center">
                            <div >
                                <MDBTypography tag="h5" className="fw-normal mb-0">
                                 Customer Support:{data.customerSupport}                                 
                                </MDBTypography>
                               
                              </div>
                              <MDBTypography tag="h5" className="fw-normal mb-0 mx-2">
                                Expected Delivery:
                                 {convertDate(date,5)}
                                
                                </MDBTypography>
                                <MDBTypography tag="h5" className="fw-normal mb-0 mx-2">
                                LastDate Delivery:
                                 {convertDate(date,7)}
                                
                                </MDBTypography>
                              <div style={{ width: "50px" }}>
                                <MDBTypography tag="h7" className="fw-normal mb-0">
                                  {quantity}
                                </MDBTypography>
                              </div>
                              <div style={{ width: "80px" }}>
                                <MDBTypography tag="h7" className="mb-0">
                                  Rs.{data.price * quantity}.00
                                </MDBTypography>
                              </div>
                              {/* <a href="#!" style={{ color: "#cecece" }}>
                                <MDBIcon fas icon="trash-alt" />
                              </a> */}
                            </div>
                          </div>
                        </MDBCardBody>
                      </MDBCard>
                      ))))} 
                      </MDBCol> 
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
      
  )
  else{
    return(
      <div className="">No Data</div>
    )
  }
}
