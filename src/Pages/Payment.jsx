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
    MDBRadio,
    
    } from "mdb-react-ui-kit";
    import toast, { Toaster } from 'react-hot-toast';
    import React, { useEffect, useState } from "react";
    import ReactStars from "react-stars";
    import { Link, NavLink, useNavigate } from "react-router-dom";
    import { onAuthStateChanged } from "firebase/auth";
    import { collection, query, where, getDocs, addDoc,doc, deleteDoc  } from "firebase/firestore";
    import { auth, storage, db } from "../firebase/firebase";
    import CartData from "./CartComponent/CartData";
    import { usecontext } from "../Context/Context";
    
    export default function Payment() {
      const context = usecontext();

      const [opt,setOpt] = useState(0);
      const [errormsg,setErrormsg] = useState("");

      const detail = context.detail;
      let username = detail.username;
      let address = detail.address;
      let phoneNumber = detail.phoneNumber;
      let email = detail.email;
      let userid = detail.userid;
      let data = detail.data;
      // console.log(detail);
      const navigate = useNavigate();

      const addressInfo = {
        username,
        address,
        phoneNumber,
        date: new Date().toLocaleString(
          "en-US",
          {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }
        )
      }

      var options = {
        key: "rzp_test_3AsPwUxDoTaKhu",
        key_secret: "0nw3I5JINdSXIf6aQZHQZKQa",
        amount: parseInt((context.total +52)*100),
        currency: "INR",
        order_receipt: 'order_rcptid_' + username,
        name: "granthalaya",
        description: "for testing purpose",
        handler: function (response) {
  
          // console.log(response)
          toast.success('Payment Successful')
  
          const paymentId = response.razorpay_payment_id
          // store in firebase 
          const orderInfo = {
            data,
            addressInfo,
            date: new Date().toLocaleString(
              "en-US",
              {
                month: "short",
                day: "2-digit",
                year: "numeric",
              }
            ),
            email: email,
            userid: userid,
            paymentId
          }
  
          try {
            addDoc(collection(db, "users",`${userid}`,"orders"), orderInfo).then(()=>{
              data.map(async ({id})=>{
              await deleteDoc(doc(db, `cart-${userid}`,`${id}`)).then(()=>{
                console.log("data delete successflully ");
              });
              // console.log(data);
             })
            })

          } catch (error) {
            console.log(error)
          }
        },
  
        theme: {
          color: "#3399cc"
        }
      };

      const buywithrazorpay = ()=>{
      var pay = new window.Razorpay(options);
      pay.open();
      console.log(pay)
      }
      
      const handlepayment = (e) =>{
        e.preventDefault();
        if(opt == 1){
          buywithrazorpay();
          navigate("/orders");
        }else if(opt == 2){
         

        }
        if(opt == 0){
          setErrormsg("please select the correct payment option");

          setTimeout((setErrormsg("")),3000);
        }
      }
      
    return (



    <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
      <div className="bg-primary">
    <div className="container py-4">
      {/* <!-- Breadcrumb --> */}
      <nav className="d-flex">
        <h6 className="mb-0">
          <Link to="/" className="text-white-50">Home</Link>
          <span className="text-white-50 mx-2"> / </span>
          <Link to="/cart" className="text-white-50">2. Shopping cart</Link>
          <span className="text-white-50 mx-2"> / </span>
          <Link to="/cart/checkout" className="text-white-50">3. Order info</Link>
          <span className="text-white-50 mx-2"> / </span>
          <Link to="" className="text-white"><u>4. Payment</u></Link>
        </h6>
      </nav>
    </div>
  </div>
  <br />

  <MDBContainer fluid className="p-5" style={{ backgroundColor: "#eee" }}>
  
      <MDBCard>
        <MDBCardBody>
          <MDBRow className="d-flex justify-content-center pb-5">
            <MDBCol md="7" xl="5" className="mb-4 mb-md-0">
              <div className="py-4 d-flex flex-row">
                <h5>
                  <span className="far fa-check-square pe-2"></span>
                  <b>ELIGIBLE</b> |
                </h5>
                <span className="ps-2">Pay</span>
              </div>
              <h4 className="text-success">Rs.{context.total}.00</h4>
              <h4>User Information </h4>
              <div className="d-flex pt-2">
                <div>
                  <p>
                    <b>
                      {email}{" "}
                      <span className="text-success">{username}</span>
                    </b>
                  </p>
                </div>
                <div className="ms-auto">    
                  <p className="text-primary">
                  <Link to ="/cart/checkout">
                    <MDBIcon
                      fas
                      icon="plus-circle"
                      className="text-primary pe-1"
                    />
                    Edit your information
                  </Link>
                  </p>
                </div>
              </div>
              <p>
                {address}
              </p>
              <div
                className="rounded d-flex"
                style={{ backgroundColor: "#f8f9fa" }}
              >
                <div className="p-2">{detail.phoneNumber}</div>
                <div className="ms-auto p-2">India</div>
              </div>
              <hr />
              <div className="pt-2">
                <div className="d-flex pb-2">
                  <div>
                    <p>
                      <b>
                        Delivery Charge{" "}
                        <span className="text-success">Rs.50.00</span>
                      </b>
                    </p>
                  </div>
                 
                </div>
                <p>
                  This is an estimate for the portion of your order (not covered
                  by insurance) due today . once insurance finalizes their
                  review refunds and/or balances will reconcile automatically.
                </p>
                <div className="d-flex flex-row pb-3">
                  <div className="d-flex align-items-center pe-2">
                        
                    <MDBRadio name="radioNoLabel" id="radioNoLabel1" onClick={()=>setOpt(1)}/>
                  </div>
                  <div className="rounded border d-flex w-100 p-3 align-items-center">
                    <p className="mb-0">
                      <MDBIcon
                        fab
                        icon="cc-visa"
                        size="lg"
                        className="text-primary pe-2"
                      />{" "}
                      Rupay
                    </p>
                    <div className="ms-auto">************@ybl</div>
                  </div>
                </div>
                <div className="d-flex flex-row pb-3">
                  <div className="d-flex align-items-center pe-2">
                    <MDBRadio name="radioNoLabel" id="radioNoLabel1" onClick={()=>setOpt(2)} />
                  </div>
                  <div className="rounded border d-flex w-100 p-3 align-items-center">
                    <p className="mb-0">
                      <MDBIcon
                        fab
                        icon="cc-mastercard"
                        size="lg"
                        className="text-dark pe-2"
                        
                      />{" "}
                      Paytm
                    </p>
                    <div className="ms-auto">************@ptm</div>
                  </div>
                </div>
                <div className="text-danger">{errormsg}</div>
                <MDBBtn block size="lg" onClick={handlepayment}>
                  Proceed to payment
                </MDBBtn>
              
                {/* <button type="button" onclick={handlepayment}>Proceed to payment</button> */}
              </div>
            </MDBCol>
            <MDBCol md="5" xl="4" offsetXl="1">
              {" "}
              <div className="py-4 d-flex justify-content-end">
                <h6>
                  <Link to="/cart/checkout">Cancel and return to website</Link>
                </h6>
              </div>
              <div
                className="rounded d-flex flex-column p-2"
                style={{ backgroundColor: "#f8f9fa" }}
              >
                <div className="p-2 me-3">
                  <h4>Order Recap</h4>
                </div>
                <div className="p-2 d-flex">
                  <MDBCol size="8">Contracted Price</MDBCol>
                  <div className="ms-auto">Rs.0.76</div>
                </div>
                <div className="p-2 d-flex">
                  <MDBCol size="8">Amount toward deductible</MDBCol>
                  <div className="ms-auto">Rs.0.40</div>
                </div>
                <div className="p-2 d-flex">
                  <MDBCol size="8">Coinsurance(0%)</MDBCol>
                  <div className="ms-auto">+ Rs.0.03</div>
                </div>
                <div className="p-2 d-flex">
                  <MDBCol size="8">Copayment</MDBCol>
                  <div className="ms-auto">+ Rs.00.03</div>
                </div>
                <div className="border-top px-2 mx-2"></div>
                <div className="p-2 d-flex pt-3">
                  <MDBCol size="8">
                    Total Deductible, Coinsurance, and Copay
                  </MDBCol>
                  <div className="ms-auto">Rs.00.01</div>
                </div>
                <div className="p-2 d-flex">
                  <MDBCol size="8">
                    Maximum out-of-pocket on Insurance Policy (not reached)
                  </MDBCol>
                  <div className="ms-auto">Rs.0.10</div>
                </div>
                <div className="border-top px-2 mx-2"></div>
                <div className="p-2 d-flex pt-3">
                  <MDBCol size="8">Product Total</MDBCol>
                  <div className="ms-auto">
                    <b>Rs.{context.total}.00</b>
                  </div>
                </div>
                <div className="p-2 d-flex">
                  <MDBCol size="8">
                    Delivery Charge{" "}
                    <span className="fa fa-question-circle text-dark"></span>
                  </MDBCol>
                  <div className="ms-auto">
                    <b>Rs.50.00</b>
                  </div>
                </div>
                <div className="border-top px-2 mx-2"></div>
                <div className="p-2 d-flex pt-3">
                  <MDBCol size="8">
                    <b>Total</b>
                  </MDBCol>
                  <div className="ms-auto">
                    <b className="text-success">Rs.{context.total + 52}.00</b>
                  </div>
                </div>
              </div>
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
    </section>
    );
    }