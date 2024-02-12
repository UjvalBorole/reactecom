import React, { useEffect, useState } from "react";
import ReactStars from "react-stars";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
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

const Orders2 = () => {
  const [product, setProducts] = useState([]);
  // const [data, setData] = useState([]);
  const [cxl, setCxl] = useState(0);
  const context = usecontext();
  const  id  = useParams();
  const userid = id.id;
  // console.log(userid);


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
// console.log(initialDate.toDateString());

// Check if the initialDate is valid
if (!isNaN(initialDate)) {
    // Add 5 days to the initial date
    var resultDate = new Date(initialDate);
    resultDate.setDate(initialDate.getDate() + day+'');
    // console.log(resultDate.toLocaleDateString());
    // Format the resultDate as a string (e.g., "Oct 22, 2023")
    var resultDateString = resultDate.toDateString(); // You can use toLocaleDateString() for a more localized format
    

    return resultDateString;
} else {
    console.log("Invalid date string");
}
}

    if(product.length == 0){
      let i= 4;let c =0;
    while(i--){
    setTimeout(()=>{
      c+=1;
      setCxl(c);
    },3000);
  }
    }

  if(product.length != 0){
  var data = product.filter(({id}) => id  === userid);
  // console.log(data);
  var total = 0;
  {data[0].data.map(({data,quantity})=>(
      total +=parseInt(data.price * quantity)
    ))}
  console.log(total);

  }

  const progress= ()=>{
    if(product.length != 0){
     const date = new Date().toLocaleString(
       "en-US",
       {
         month: "short",
         day: "2-digit",
         year: "numeric",
       }
     );
     const olddate = data[0].date;
      //  console.log(olddate);
     let i = 0;
     while(i<=5){
       var initialDate = new Date(date);
      //  console.log(convertDate(olddate,i),initialDate.toDateString())
       if(convertDate(olddate,i)===initialDate.toDateString())return 20*i;
       i++;
     }
     if(i == 6)return 100;
    }else{
     return 0;
    }
    } 
   
 

  if(product.length != 0)return (
    
    <MDBContainer className='my-5'>
        <section className="h-100 gradient-custom">
  <div className="container h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-lg-10 col-xl-8">
        <div className="card" style={{borderRadius: "10px"}}>
          <div className="card-header px-4 py-5">
            <h5 className="text-muted mb-0">Order's <span style={{"color": "#a8729a"}}>date</span>{' '}{data[0].date}!</h5>
           
              <MDBCardBody className="p-2 text-black">
                
                <div className="d-flex align-items-center ">
                  <div className="flex-shrink-0">
                    <MDBCardImage
                      style={{ width: '70px' }}
                      className="img-fluid rounded-circle border border-dark border-3"
                      src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-2.webp'
                      alt='Generic placeholder image'
                      fluid />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <div className="d-flex flex-row align-items-center ">
                      <p className="mb-0 me-2">{data[0].addressInfo.username
}</p>
                    </div>
                      
                      <span><p className="text-muted">{data[0].email}</p></span>
                      <span><p className="text-muted">{data[0].addressInfo.phoneNumber}</p></span>

                    <div>
                      
                    </div>
                  </div>
                      <p className="mb-0 me-2">{data[0].addressInfo.address
}</p>
                </div>
                </MDBCardBody>
   

          </div>
          <div className="card-body p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <p className="lead fw-normal mb-0" style={{"color": "#a8729a"}}>Receipt</p>
              <p className="small text-muted mb-0">Receipt Voucher : {data[0].paymentId}</p>
            </div>
            {data[0].data.map((data)=>(
             
            <div className="card shadow-0 border mb-4">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-2">
                    <img src={data.data.productImage}
                      className="img-fluid" alt="Phone"/>
                  </div>
                  <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                    <p className="text-muted mb-0">{data.data.productTitle}</p>
                  </div>
                  <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                    <p className="text-muted mb-0 small">{data.data.brand} {data.data.productType}</p>
                  </div>
                  <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                    <p className="text-muted mb-0 small">Warrenty:{data.data.warrenty}</p>
                  </div>
                  <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                    <p className="text-muted mb-0 small">Qty: {data.quantity}</p>
                  </div>
                  <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                    <p className="text-muted mb-0 small">Rs.{data.data.price * data.quantity}.00</p>
                  </div>
                </div>
                <hr className="mb-4" style={{backgroundColor:" #e0e0e0", "opacity": "1"}}/>
                <div className="row d-flex align-items-center">
                  <div className="col-md-2">
                    <p className="text-muted mb-0 small">Track Order</p>
                  </div>
                  <div className="col-md-10">
                    <div className="progress" style={{height: "6px", borderRadius: "16px"}}>
                      <div className="progress-bar" role="progressbar"
                        style={{width: `${progress()}%`, borderRadius: "16px", backgroundColor:" #a8729a"}} aria-valuenow="65"
                        aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <div className="d-flex justify-content-around mb-1">
                      <p className="text-muted mt-1 mb-0 small ms-xl-5">Out for delivary</p>
                      <p className="text-muted mt-1 mb-0 small ms-xl-5">Delivered</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          
           ))}
            {/* <div className="card shadow-0 border mb-4">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-2">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/1.webp"
                      className="img-fluid" alt="Phone"/>
                  </div>
                  <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                    <p className="text-muted mb-0">iPad</p>
                  </div>
                  <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                    <p className="text-muted mb-0 small">Pink rose</p>
                  </div>
                  <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                    <p className="text-muted mb-0 small">Capacity: 32GB</p>
                  </div>
                  <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                    <p className="text-muted mb-0 small">Qty: 1</p>
                  </div>
                  <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                    <p className="text-muted mb-0 small">$399</p>
                  </div>
                </div>
                <hr className="mb-4" style={{backgroundColor: "#e0e0e0", "opacity": "1"}}/>
                <div className="row d-flex align-items-center">
                  <div className="col-md-2">
                    <p className="text-muted mb-0 small">Track Order</p>
                  </div>
                  <div className="col-md-10">
                    <div className="progress" style={{height: "6px", borderRadius: "16px"}}>
                      <div className="progress-bar" role="progressbar"
                        style={{width: "20%", borderRadius: "16px", backgroundColor: "#a8729a"}} aria-valuenow="20"
                        aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <div className="d-flex justify-content-around mb-1">
                      <p className="text-muted mt-1 mb-0 small ms-xl-5">Out for delivary</p>
                      <p className="text-muted mt-1 mb-0 small ms-xl-5">Delivered</p>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}

            <div className="d-flex justify-content-between pt-2">
              <p className="fw-bold mb-0">Order Details</p>
              <p className="text-muted mb-0"><span className="fw-bold me-4">Total</span> Rs.{total}.00</p>
            </div>

            <div className="d-flex justify-content-between pt-2">
              <p className="text-muted mb-0">Invoice Number : {data[0].id}</p>
              <p className="text-muted mb-0"><span className="fw-bold me-4">Discount</span> 1.00</p>
            </div>

            <div className="d-flex justify-content-between">
              <p className="text-muted mb-0">Invoice Date : {data[0].date}</p>
              <p className="text-muted mb-0"><span className="fw-bold me-4">GST 18%</span> 0.10</p>
            </div>

            <div className="d-flex justify-content-between mb-5">
              <p className="text-muted mb-0">Recepits Voucher :  {data[0].paymentId}</p>
              <p className="text-muted mb-0"><span className="fw-bold me-4">Delivery Charges</span> Rs.{50}.00</p>
            </div>
          </div>
          <div className="card-footer border-0 px-4 py-5"
            style={{backgroundColor: "#a8729a", "border-bottom-left-radius": "10px", "border-bottom-right-radius": "10px"}}>
            <h5 className="d-flex align-items-center justify-content-end text-white text-uppercase mb-0">Total
              paid: <span className="h2 mb-0 ms-2">Rs.{total+52}.00</span></h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </MDBContainer>
  )
  else{
    return(
      <div className="">Loading....</div>
    )
  }
}

export default Orders2

