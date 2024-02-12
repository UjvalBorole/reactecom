import React, { useEffect, useState } from "react";
import ReactStars from "react-stars";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { auth, storage, db } from "../firebase/firebase";
import { MDBBtn, MDBContainer } from "mdb-react-ui-kit";
import CartData from "./CartComponent/CartData";
import { usecontext } from "../Context/Context";
import toast, { Toaster } from 'react-hot-toast';

const CheckOut = () => {
  const context = usecontext();


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
  const [username,setusername] = useState();
  const [email,setEmail]= useState();
  const [phoneNumber,setPhoneNumber] = useState();
  const [add,setAddress] = useState();
  const [city,setCity] = useState();
  const [house,setHouse] = useState();
  const [postal,setPostal] = useState();
  const [zip,setzip] = useState();
  const [msg,setMsg] = useState();
  const [shoping,setShoping] = useState(0);
  
 

const [cartdata, setCartData] = useState([]);
if(loggedinuser){
  const getCartData = async()=>{
    const cartArray = [];
    const path = `cart-${loggedinuser[0].uid}`
    await getDocs(collection(db,path)).then((querySnapshot)=>{
      // console.log(querySnapshot);
      querySnapshot.forEach((docs)=>{
        cartArray.push({...docs.data(),id:docs.id});
      });
      setCartData(cartArray);
    }).catch('Error error error')
  }
  getCartData();
  // console.log(cartdata);
}
var userid = "";
useEffect(()=>{
  if(loggedinuser){
    userid = loggedinuser[0].uid;
    setusername(loggedinuser[0].username);
    setEmail(loggedinuser[0].email);
    setPhoneNumber(loggedinuser[0].phonenumber);
    setAddress(loggedinuser[0].address);
   }
 },[cartdata])

 const navigate = useNavigate();

 const handlesubmit = async(e)=>{
  e.preventDefault();
  if (shoping == 0 || add === "" || zip === "" || phoneNumber == "" || username === "" || city===""||house===""||postal==="") {
     const notify = () =>toast.error("All fields are required", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    })
    notify();
  }else{
    const address = add+", "+ city+', '+house+', '+postal+', '+zip;
  // setAddress(add);
  // // console.log(add);
  // console.log(address);

  const itemdata = {
    username,
    userid,
    email,
    phoneNumber,
    address,
    msg,
    shoping,
    data:cartdata, 
  }
  context.setDetail(itemdata);
  navigate("/payment")
}
  
}
// console.log(shoping);

// console.log(address + city + zip+postal+house);
// console.log();


  return (
    <MDBContainer fluid>
<header>
 
  {/* <!-- Heading --> */}
  <div className="bg-primary">
    <div className="container py-4">
      {/* <!-- Breadcrumb --> */}
      <nav className="d-flex">
        <h6 className="mb-0">
          <Link to="/" className="text-white-50">Home</Link>
          <span className="text-white-50 mx-2"> / </span>
          <Link to="cart" className="text-white-50">2. Shopping cart</Link>
          <span className="text-white-50 mx-2"> / </span>
          <Link to="" className="text-white"><u>3. Order info</u></Link>
          {/* <span className="text-white-50 mx-2"> / </span>
          <Link to="" className="textF-white-50">4. Payment</Link> */}
        </h6>
      </nav>
      {/* <!-- Breadcrumb --> */}
    </div>
  </div>
  {/* <!-- Heading --> */}
</header>
<Toaster/>
<section className="bg-light py-5">
  <div className="container">
    <div className="row">
      <div className="col-xl-8 col-lg-8 mb-4">
        <div className="card mb-4 border shadow-0">
          <div className="p-4 d-flex justify-content-between">
            <div className="">
              <h5>want to change in Address</h5>
              <p className="mb-0 text-wrap ">Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
            </div>
            <div className="d-flex align-items-center justify-content-center flex-column flex-md-row">
              {/* <Link to="#" className="btn btn-outline-primary me-0 me-md-2 mb-2 mb-md-0 w-100">Register</Link>
              <Link to="#" className="btn btn-primary shadow-0 text-nowrap w-100">Sign in</Link> */}
            </div>
          </div>
        </div>

        {/* <!-- Checkout --> */}
        <div className="card shadow-0 border">
          <div className="p-4">
            <h5 className="card-title mb-3">User checkout</h5>
            <div className="row">
              <div className="col-6 mb-3">
                <p className="mb-0">Full Name</p>
                <div className="form-outline ">
                  <input type="text" id="typeText" value={username} className="form-control border" onChange={(e)=>setusername(e.target.value)}/>
                </div>
              </div>

              <div className="col-6">
                <p className="mb-0">Alias Name</p>
                <div className="form-outline">
                  <input type="text" id="typeText" placeholder="Type here" className="form-control border" />
                </div>
              </div>

              <div className="col-6 mb-3">
                <p className="mb-0">Phone</p>
                <div className="form-outline">
                  <input type="tel" id="typePhone" value={phoneNumber} className="form-control border" onChange={(e)=>setPhoneNumber(parseInt(e.target.value))}/>
                </div>
              </div>

              <div className="col-6 mb-3">
                <p className="mb-0">Email</p>
                <div className="form-outline">
                  <input type="email" id="typeEmail" value={email} className="form-control border" onChange={(e)=>setEmail(e.target.value)}/>
                </div>
              </div>
            </div>

            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
              <label className="form-check-label" htmlFor="flexCheckDefault">Keep me up to date on news</label>
            </div>

            <hr className="my-4" />

            <h5 className="card-title mb-3">Shipping info</h5>

            <div className="row mb-3">
              <div className="col-lg-4 mb-3">
                {/* <!-- Default checked radio --> */}
                <div className="form-check h-100 border rounded-3">
                  <div className="p-3">
                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" onChange={()=>setShoping(1)}/>
                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                      Express delivery <br />
                      <small className="text-muted">3-4 days via Fedex </small>
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                {/* <!-- Default radio --> */}
                <div className="form-check h-100 border rounded-3">
                  <div className="p-3">
                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" onChange={()=>setShoping(2)}/>
                    <label className="form-check-label" htmlFor="flexRadioDefault2">
                      Post office <br />
                      <small className="text-muted">20-30 days via post </small>
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                {/* <!-- Default radio --> */}
                <div className="form-check h-100 border rounded-3">
                  <div className="p-3">
                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" onChange={()=>setShoping(3)}/>
                    <label className="form-check-label" htmlFor="flexRadioDefault3">
                      Self pick-up <br />
                      <small className="text-muted">Come to our shop </small>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-8 mb-3">
                <p className="mb-0">Address</p>
                <div className="form-outline">
                  <input type="text" id="typeText" value={add} className="form-control border" onChange={(e)=>setAddress(e.target.value)}/>
                </div>
              </div>

              <div className="col-sm-4 mb-3">
                <p className="mb-0">City</p>
                <input type="text" id="typeText"  value={city} className="form-control border"  onChange={(e)=>setCity(e.target.value)}/>

              </div>

              <div className="col-sm-4 mb-3">
                <p className="mb-0">House</p>
                <div className="form-outline">
                  <input type="text" id="typeText" value={house} className="form-control border"  onChange={(e)=>setHouse(e.target.value)}/>
                </div>
              </div>

              <div className="col-sm-4 col-6 mb-3">
                <p className="mb-0">Postal code</p>
                <div className="form-outline">
                  <input type="text" id="typeText" value={postal} className="form-control border"   onChange={(e)=>setPostal(e.target.value)}/>
                </div>
              </div>

              <div className="col-sm-4 col-6 mb-3">
                <p className="mb-0">Zip</p>
                <div className="form-outline">
                  <input type="text" id="typeText" value={zip} className="form-control border"  onChange={(e)=>setzip(e.target.value)}/>
                </div>
              </div>
            </div>

            <div className="form-check mb-3">
              <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault1" />
              <label className="form-check-label" htmlFor="flexCheckDefault1">Save this address</label>
            </div>

            <div className="mb-3">
              <p className="mb-0">Message to seller</p>
              <div className="form-outline">
                <textarea className="form-control border" id="textAreaExample1" value={msg} rows="2"  onChange={(e)=>setMsg(e.target.value)}></textarea>
              </div>
            </div>

            <div className="float-end">
              <Link to={"/cart"} className="btn btn-light border mx-3">Cancel</Link>
              <button className="btn btn-success shadow-0 border" onClick={handlesubmit}>Continue</button>
            </div>
          </div>
        </div>
        {/* <!-- Checkout --> */}
      </div>
      <div className="col-xl-4 col-lg-4 d-flex justify-content-center justify-content-lg-end">
        <div className="ms-lg-4 mt-4 mt-lg-0" style={{maxWidth: "320px"}}>
          <h6 className="mb-3">Summary</h6>
          <div className="d-flex justify-content-between">
            <p className="mb-2">Total price:</p>
            <p className="mb-2">Rs.{context.total}.00</p>
          </div>
          <div className="d-flex justify-content-between">
            <p className="mb-2">Discount:</p>
            <p className="mb-2 text-danger">- Rs.{context.total/50}.00</p>
          </div>
          <div className="d-flex justify-content-between">
            <p className="mb-2">Shipping cost:</p>
            <p className="mb-2">+ Rs.50</p>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <p className="mb-2">Total price:</p>
            <p className="mb-2 fw-bold">Rs.{context.total + 50}.00</p>
          </div>

          <div className="input-group mt-3 mb-4">
            <input type="text" className="form-control border" name="" placeholder="Promo code" />
            <button className="btn btn-light text-primary border">Apply</button>
          </div>

          <hr />
          <h6 className="text-dark my-4">Items in cart</h6>

          {
            cartdata.map(({data,quantity})=>(
              <div className="d-flex align-items-center mb-4">
              <div className="me-3 position-relative">
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill badge-secondary">
                  {quantity}
                </span>
                <img src={data.productImage} style={{height: "96px", width: "96px"}} className="img-sm rounded border" />
              </div>
              <div className="">
                <Link to="#" className="nav-link">
                {data.brand} {data.productTitle} {data.productType} <br />
                customerSupport:{data.customerSupport}
                </Link>
                <div className="price text-muted">Total: Rs.{data.price * quantity} </div>
              </div>
            </div>     
            ))
            }
        </div>
      </div>
    </div>
  </div>
</section>

    </MDBContainer>
  )
}

export default CheckOut