import React, { useEffect, useState } from "react";
import ReactStars from 'react-stars'
import { Link, NavLink, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs,addDoc, doc } from "firebase/firestore";
import { auth, storage, db } from "../../firebase/firebase";


const ProductContainer = (product) => {
    // console.log("abc",product.brand)
    let overalAlltax = 10/100;
    let overCommission = 10/100;
    let extra = 10/100;
    const [cart, setCart] = useState(false);

    let mrp = parseInt(product.price);
    let total = mrp + overalAlltax*mrp + overCommission*mrp + extra*mrp;
    let desc =  product.description
    desc = desc.substring(0,250)

   const [successMsg,setSuccessMsg] = useState();
   const [errorMsg,setErrorMsg] = useState();

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

  const addToCart = async()=>{
  
    if(loggedinuser){
      await addDoc(collection(db,`cart-${loggedinuser[0].uid}`),{
        product,quantity:1
      }).then(()=>{
        setSuccessMsg('Product added to Cart Successfully');
      }).catch((error)=>{
        setErrorMsg(error);
      })
    }else{
      setErrorMsg('You need to login first');
    }
  }
console.log("product",product);
 const addLike = async()=>{
  if(loggedinuser){
    await addDoc(collection(db,"users",`${loggedinuser[0].uid}`,"Likes"),{
      product,quantity:1
    }).then(()=>{
      setSuccessMsg('Product added to Likes Successfully');
    }).catch((error)=>{
      setErrorMsg(error);
    })
  }else{
    setErrorMsg('You need to login first');
  }
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
        cartdata.forEach((doc)=>{
          if(doc.data.productTitle === product.productTitle)setCart(true);
        })
        // console.log(cartdata);
      }).catch('Error error error')
    }
    getCartData();
    // console.log(cartdata);
  }
  

  return (
    <div className="row justify-content-center mb-3">
      {successMsg && <div className="text-success">{successMsg}</div>}
      {errorMsg && <div className="text-danger">{errorMsg}</div>}
          <div className="col-md-12">
            <div className="card shadow-0 border rounded-3">
              <div className="card-body">
                <div className="row g-0">
                  <div className="col-xl-3 col-md-4 d-flex justify-content-center">
                    <div className="bg-image hover-zoom ripple rounded ripple-surface me-md-3 mb-3 mb-md-0">
                      <img src={product.productImage} className="w-100" />
                      <Link to={`/product/${product.id}/${product.productType}`}>
                        <div className="hover-overlay">
                          <div className="mask" style={{backgroundColor: "rgba(253, 253, 253, 0.15)"}}></div>
                        </div>
                      </Link>
                    </div>
                  </div>
                  <div className="col-xl-6 col-md-5 col-sm-7">
                    <h5>{product.productTitle.toUpperCase()}</h5>
                    {product.rating ? <div className="d-flex flex-row">
                      <div className="text-warning ">
                        
                      <ReactStars
                          size={20}
                          half={true}
                          value={product.rating}
                          edit={false}
                        />
                      </div>
                          <span className="ms-1 mt-1 text-warning">
                          {product.rating}
                        </span>
                      <span className="mx-2 mt-1 text-muted">154 orders</span>
                    </div>
                    :
                    <div className="d-flex flex-row">
                      <div className="text-warning ">
                        
                      <ReactStars
                          size={20}
                          half={true}
                          value={4.5}
                          edit={false}
                        />
                      </div>
                          <span className="ms-1 mt-1 text-warning">
                          4.5
                        </span>
                      <span className="mx-2 mt-1 text-muted">154 orders</span>
                    </div>
                    }   

                    <p className="text mb-4 mb-md-0">
                     {desc}...
                    </p>
                  </div>
                  <div className="col-xl-3 col-md-3 col-sm-5">
                    <div className="d-flex flex-row align-items-center mb-1">
                      <h4 className="mb-1 me-1">Rs{product.price}</h4>
                      <span className="text-danger"><s>Rs{total}</s></span>
                    </div>
                    <h6 className="text-success">Free shipping</h6>
                    <div className="mt-4">
                      {cart == false?<button className="btn btn-primary shadow-0" style={{marginRight:"6px"}} type="button" onClick={addToCart}>Add Cart</button>
                      :<Link to="" className="btn btn-success shadow-0" style={{marginRight:"6px"}} type="button" >Add Cart</Link>}
                      <button onClick={addLike} className="btn btn-light border px-2 pt-2 icon-hover"><i className="fas fa-heart fa-lg px-1"></i></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  )
}

export default ProductContainer