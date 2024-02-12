import React, { useEffect, useState } from "react";
import ReactStars from "react-stars";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { auth, storage, db } from "../firebase/firebase";
import { MDBBtn, MDBContainer } from "mdb-react-ui-kit";
import CartData from "./CartComponent/CartData";
import { usecontext } from "../Context/Context";

const Cart = () => {
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

 if(loggedinuser){
  var userid = loggedinuser[0].uid;
  //  console.log(loggedinuser[0].uid);
 }

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

  if(loggedinuser){
    let totalprice = 0;
   
      cartdata.map(({quantity,data})=>{
        totalprice += (parseInt(data.price) * quantity);
      })
      context.setTotal(parseInt(totalprice));
    }
 



  // console.log(cartdata);
  if(cartdata.length != 0)return (
    
    <MDBContainer fluid>
      <header>
        {/* <!-- Heading --> */}
        <div className="bg-primary">
          <div className="container py-4">
            {/* <!-- Breadcrumb --> */}
            <nav className="d-flex">
              <h6 className="mb-0">
                <Link to="" className="text-white-50">
                  Home
                </Link>
                <span className="text-white-50 mx-2"> / </span>
                <Link to="" className="text-white">
                  <u>Shopping cart</u>
                </Link>
              </h6>
            </nav>
            {/* <!-- Breadcrumb --> */}
          </div>
        </div>
        {/* <!-- Heading --> */}
      </header>

      {/* <!-- cart + summary --> */}
      <section className="bg-light my-5">
        <div className="container">
          <div className="row">
            {/* <!-- cart --> */}
            <div className="col-lg-9">
              <div className="card border shadow-0">
                <div className="m-4">
                  <h4 className="card-title mb-4">Your shopping cart</h4>
                  <hr />

                
                  {
                    cartdata.map((data)=>(
                      <CartData key={data.id} item={data} userid ={userid}/>
                  
                      
                    ))
                  }

                  {/* <div className="row gy-3 mb-4">
                    <div className="col-lg-5">
                      <div className="me-lg-5">
                        <div className="d-flex">
                          <img
                            src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/12.webp"
                            className="border rounded me-3"
                            style={{ width: "96px", height: "96px" }}
                          />
                          <div className="">
                            <Link to="#" className="nav-link">
                              Mens T-shirt Cotton Base
                            </Link>
                            <p className="text-muted">Blue, Medium</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-2 col-sm-6 col-6 d-flex flex-row flex-lg-column flex-xl-row text-nowrap">
                      <div className="">
                        <select
                          style={{ width: "100px" }}
                          className="form-select me-4"
                        >
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                        </select>
                      </div>
                      <div className="">
                        <text className="h6">$44.80</text> <br />
                        <small className="text-muted text-nowrap">
                          {" "}
                          $12.20 / per item{" "}
                        </small>
                      </div>
                    </div>
                    <div className="col-lg col-sm-6 d-flex justify-content-sm-center justify-content-md-start justify-content-lg-center justify-content-xl-end mb-2">
                      <div className="float-md-end">
                        <Link
                          to="#!"
                          className="btn btn-light border px-2 icon-hover-primary"
                        >
                          <i className="fas fa-heart fa-lg px-1 text-secondary"></i>
                        </Link>
                        <Link
                          to="#"
                          className="btn btn-light border text-danger icon-hover-danger"
                        >
                          {" "}
                          Remove
                        </Link>
                      </div>
                    </div>
                  </div> */}
                </div>

                <div className="border-top pt-4 mx-4 mb-4">
                  <p>
                    <i className="fas fa-truck text-muted fa-lg"></i> Free
                    Delivery within 1-2 weeks
                  </p>
                  <p className="text-muted">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip
                  </p>
                </div>
              </div>
            </div>
            {/* <!-- cart --> */}
            {/* <!-- summary --> */}
            <div className="col-lg-3">
              <div className="card mb-3 border shadow-0">
                <div className="card-body">
                  <form>
                    <div className="form-group">
                      <label className="form-label">Have coupon?</label>
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control border"
                          name=""
                          placeholder="Coupon code"
                        />
                        <button className="btn btn-light border">Apply</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="card shadow-0 border">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <p className="mb-2">Total price:</p>
                    <p className="mb-2">Rs.{context.total}.00</p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p className="mb-2">Discount:</p>
                    <p className="mb-2 text-success">-Rs.{context.total/50}.00</p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p className="mb-2">TAX:</p>
                    <p className="mb-2">Rs.50.00</p>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between">
                    <p className="mb-2">Total price:</p>
                    <p className="mb-2 fw-bold">Rs.{context.total+50}.00</p>
                  </div>

                  <div className="mt-3">
                    <Link
                      to="/cart/checkout"
                      className="btn btn-success w-100 shadow-0 mb-2"
                    >
                      {" "}
                      Checkout Purchase{" "}
                    </Link>
                    <Link to="/" className="btn btn-light w-100 border mt-2">
                      {" "}
                      Back to shop{" "}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- summary --> */}
          </div>
        </div>
      </section>
      {/* <!-- cart + summary --> */}
      <section>
        <div className="container my-5">
          <header className="mb-4">
            <h3>Recommended items</h3>
          </header>

          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="card px-4 border shadow-0 mb-4 mb-lg-0">
                <div className="mask px-2" style={{ height: "50px" }}>
                  <div className="d-flex justify-content-between">
                    <h6>
                      <span className="badge bg-danger pt-1 mt-3 ms-2">
                        New
                      </span>
                    </h6>
                    <Link to="#">
                      <i className="fas fa-heart text-primary fa-lg float-end pt-3 m-2"></i>
                    </Link>
                  </div>
                </div>
                <Link to="#" className="">
                  <img
                    src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/7.webp"
                    className="card-img-top rounded-2"
                  />
                </Link>
                <div className="card-body d-flex flex-column pt-3 border-top">
                  <Link to="#" className="nav-link">
                    Gaming Headset with Mic
                  </Link>
                  <div className="price-wrap mb-2">
                    <strong className="">$18.95</strong>
                    <del className="">$24.99</del>
                  </div>
                  <div className="card-footer d-flex align-items-end pt-3 px-0 pb-0 mt-auto">
                    <Link to="#" className="btn btn-outline-primary w-100">
                      Add to cart
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="card px-4 border shadow-0 mb-4 mb-lg-0">
                <div className="mask px-2" style={{ height: "50px" }}>
                  <Link to="#">
                    <i className="fas fa-heart text-primary fa-lg float-end pt-3 m-2"></i>
                  </Link>
                </div>
                <Link to="#" className="">
                  <img
                    src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/5.webp"
                    className="card-img-top rounded-2"
                  />
                </Link>
                <div className="card-body d-flex flex-column pt-3 border-top">
                  <Link to="#" className="nav-link">
                    Apple Watch Series 1 Sport{" "}
                  </Link>
                  <div className="price-wrap mb-2">
                    <strong className="">$120.00</strong>
                  </div>
                  <div className="card-footer d-flex align-items-end pt-3 px-0 pb-0 mt-auto">
                    <Link to="#" className="btn btn-outline-primary w-100">
                      Add to cart
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="card px-4 border shadow-0">
                <div className="mask px-2" style={{ height: "50px" }}>
                  <Link to="#">
                    <i className="fas fa-heart text-primary fa-lg float-end pt-3 m-2"></i>
                  </Link>
                </div>
                <Link to="#" className="">
                  <img
                    src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/9.webp"
                    className="card-img-top rounded-2"
                  />
                </Link>
                <div className="card-body d-flex flex-column pt-3 border-top">
                  <Link to="#" className="nav-link">
                    Men's Denim Jeans Shorts
                  </Link>
                  <div className="price-wrap mb-2">
                    <strong className="">$80.50</strong>
                  </div>
                  <div className="card-footer d-flex align-items-end pt-3 px-0 pb-0 mt-auto">
                    <Link to="#" className="btn btn-outline-primary w-100">
                      Add to cart
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="card px-4 border shadow-0">
                <div className="mask px-2" style={{ height: "50px" }}>
                  <Link to="#">
                    <i className="fas fa-heart text-primary fa-lg float-end pt-3 m-2"></i>
                  </Link>
                </div>
                <Link to="#" className="">
                  <img
                    src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/10.webp"
                    className="card-img-top rounded-2"
                  />
                </Link>
                <div className="card-body d-flex flex-column pt-3 border-top">
                  <Link to="#" className="nav-link">
                    Mens T-shirt Cotton Base Layer Slim fit{" "}
                  </Link>
                  <div className="price-wrap mb-2">
                    <strong className="">$13.90</strong>
                  </div>
                  <div className="card-footer d-flex align-items-end pt-3 px-0 pb-0 mt-auto">
                    <Link to="#" className="btn btn-outline-primary w-100">
                      Add to cart
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Recommended --> */}
    </MDBContainer>
  )
  else
    return(
  <> <br />
      <div className="d-flex align-items-center  justify-content-sm-center justify-content-md-start justify-content-lg-center justify-content-xl-center mb-2">
        <div className="text-warnning col-lg-3 col-md-6 col-sm-6">
        Please Add Some Product In Cart
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
  
};

export default Cart;
