import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth"
import { collection, query, where, getDocs, QuerySnapshot } from 'firebase/firestore';
import {auth, db} from "../../firebase/firebase"
import { MDBBadge, MDBBtn } from 'mdb-react-ui-kit';
import { usecontext } from "../../Context/Context";

const Navbar = () => {
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
const navigate = useNavigate();
const handleLogout = () =>{
  auth.signOut().then(()=>{
    navigate("/")
  })
}

const loggedinuser = GetCurrentUser();
// console.log(loggedinuser);
const context = usecontext();

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
      context.setUser(loggedinuser[0].uid);
      setCartData(cartArray);
    }).catch('Error error error')
  }
  getCartData();
  // console.log(cartdata);
}
  return (
    <header>
      {/* <!-- Jumbotron --> */}
      <div className="p-3 text-center bg-white border-bottom">
        <div className="container">
          <div className="row gy-3">
            {/* <!-- Left elements --> */}
            <div className="col-lg-2 col-sm-4 col-4">
              <Link
                to="https://mdbootstrap.com/"
                target="_blank"
                className="float-start"
              >
                <img
                  src="https://mdbootstrap.com/img/logo/mdb-transaprent-noshadows.png"
                  height="35"
                />
              </Link>
            </div>
            {/* <!-- Left elementsF --> */}

            {/* <!-- Center elements --> */}
           {loggedinuser &&  <div className="order-lg-last col-lg-5 col-sm-8 col-8">
              <div className="d-flex float-end ">
                <Link
                  to={`/wishlist/${loggedinuser[0].uid}`}
                  className="text-black me-1 border rounded py-1 px-3 nav-link d-flex align-items-center"
                  
                >
                  {" "}
                  <i className="fas fa-heart m-1 me-md-2"></i>
                  <p className="d-none d-md-block mb-0">Wishlist</p>{" "}
                </Link>
                <Link
                  to="cart"
                  className="text-black border rounded py-1 px-3  d-flex align-items-center"
                  
                >
                {cartdata.length!=0?  <MDBBadge color='danger' light pill className='position-absolute translate-middle'>
          {cartdata.length}
          <span class="visually-hidden">unread messages</span>
        </MDBBadge>:""}
                  {" "}
                  <i className="fas fa-shopping-cart m-1 me-md-2"></i>
                  <p className="d-none d-md-block mb-0">My cart</p>{" "}
                </Link>
                {loggedinuser[0].email == "admin@gmail.com"?<NavLink
                to="admin"
                  className="mx-1 text-black  border rounded py-1 px-1  d-flex align-items-center"
                
                >
                  {" "}
                  <i className="fas fa-users m-1 me-md-2"></i>
                  <p className="d-none d-md-block mb-0">Admin</p>{" "}
                  
                </NavLink>:""}
                <NavLink
                  onClick={handleLogout}
                  className="mx-1 text-black  border rounded py-1 px-1  d-flex align-items-center"
                
                >
                  {" "}
                  <i className="fas fa-sign-out-alt m-1 me-md-2"></i>
                  <p className="d-none d-md-block mb-0">Signout</p>{" "}
                  
                </NavLink>

              </div>
            </div>}
            {!loggedinuser &&  <div className="order-lg-last col-lg-5 col-sm-8 col-8">
              <div className="d-flex float-end ">
                <Link
                  to="signin"
                  className="text-black me-1 border rounded py-1 px-3 nav-link d-flex align-items-center"
                  
                >
                  {" "}
                  <i className=" fas fa-user-alt m-1 me-md-2"></i>
                  <p className="d-none d-md-block mb-0">Sign in</p>{" "}
                </Link>
                </div>
                </div>}
            {/* <!-- Center elements --> */}

            {/* <!-- Right elements --> */}
            <div className="col-lg-5 col-md-12 col-12 ">
              <div className="input-group float-center">
                <div className="form-outline border">
                  <input type="search" id="form1" className="form-control" />
                  <label className="form-label" htmlFor="form1">
                    Search
                  </label>
                </div>
                <button type="button" className="btn btn-primary shadow-0">
                  <i className="fas fa-search"></i>
                </button>
              </div>
            </div>
            {/* <!-- Right elements --> */}
          </div>
        </div>
      </div>
      {/* <!-- Jumbotron --> */}

      {/* <!-- Navbar --> */}
      <nav
        className="navbar navbar-expand-lg navbar-light"
        style={{ backgroundColor: "#f5f5f5" }}
      >
        {/* <!-- Container wrapper --> */}
        <div className="container justify-content-center justify-content-md-between">
          {/* <!-- Toggle button --> */}
          <button
            className="navbar-toggler border text-dark py-2"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarLeftAlignExample"
            aria-controls="navbarLeftAlignExample"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars"></i>
          </button>

          {/* <!-- Collapsible wrapper --> */}
          <div className="collapse navbar-collapse" id="navbarLeftAlignExample">
            {/* <!-- Left links --> */}
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <Link to="/">
              <li className="nav-item">
                <Link className="nav-link text-dark" aria-current="page" >
                  Home
                </Link>
              </li>
              </Link>
              <li className="nav-item">
                <Link className="nav-link text-dark" to="#">
                  Categories
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/orders">
                   My Orders
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-dark" to="#">
                  Gift boxes
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-dark" to="#">
                  Projects
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-dark" to="#">
                  Menu item
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-dark" to="#">
                  Menu name
                </Link>
              </li>
              {/* <!-- Navbar /dropdown --> */}
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle text-dark mb-0"
                  to="#"
                  id="navbarDropdown"
                  role="button"
                  data-mdb-toggle="dropdown"
                  aria-expanded="false"
                >
                  Others
                </Link>
                {/* <!-- Dropdown menu --> */}
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link className="dropdown-item" to="#">
                      Action
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="#">
                      Another action
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item" to="#">
                      Something else here
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
            {/* <!-- Left links --> */}
          </div>
        </div>
        {/* <!-- Container wrapper --> */}
      </nav>
      {/* <!-- Navbar --> */}
    </header>
  );
};

export default Navbar;
