import React, { useEffect, useState } from "react";
import ReactStars from "react-stars";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs, addDoc,doc, deleteDoc, updateDoc } from "firebase/firestore";
import { auth, storage, db } from "../../firebase/firebase";
import { MDBBtn, MDBContainer } from "mdb-react-ui-kit";
import { usecontext } from "../../Context/Context";

const CartData = ({item,userid}) => {
    // console.log(item.quantity);
    
    const [prodquantity,setProdquantity] = useState(item.quantity);
    const [prodPrice,setProdPrice] = useState(item.data.price * prodquantity);
    const context = usecontext();

    const deleteProduct = async() =>{
      await deleteDoc(doc(db,`cart-${userid}`,`${item.id}`))
      .then(()=>{
          console.log("document Deleted Successfully");

      })
      // console.log(userid,item.id);
  }

    
    const incrementquantity = async() =>{
        setProdquantity(prodquantity+1)
        setProdPrice((item.data.price * (prodquantity+1)));
        // context.setTotal((prev)=>prev+item.data.price)
        // context.setTotal((prev)=>parseInt(prev)+parseInt(item.data.price));

        const itemref = doc(db,`cart-${userid}`,`${item.id}`)
        await updateDoc(itemref,{
          quantity: prodquantity+1,
          
        }).then(()=>{console.log("increasing quantity")})

    }
    const decrementquantity = async() =>{
        if(prodquantity > 1){
            setProdquantity(prodquantity-1);
            setProdPrice(prodPrice-item.data.price)
            // context.setTotal((prev)=>parseInt(prev)-parseInt(item.data.price));
            const itemref = doc(db,`cart-${userid}`,`${item.id}`)
        await updateDoc(itemref,{
          quantity: prodquantity-1,
          
        }).then(()=>{console.log("decresing quantity")})
        }
    }
  return (
     <div className="row gy-3 mb-2">
                    <div className="col-lg-5">
                      <div className="me-lg-5">
                        <div className="d-flex">
                          <img
                            src={item.data.productImage}
                            className="border rounded me-3"
                            style={{ width: "96px", height: "96px" }}
                          />
                          <div className="">
                            <Link to="#" className="nav-link">
                            {item.data.brand} {item.data.productTitle} {item.data.productType}
                            </Link>
                            <div className="">
                        <text className="h6">Rs.{prodPrice}.00</text> <br />
                        <small className="text-muted text-nowrap">
                          {" "}
                         Rs.{item.data.price} / per item{" "}
                        </small>
                      </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-2 col-sm-6 col-6 d-flex flex-lg-column flex-xl-row text-nowrap">
                      <div className="row">
                      <div className="col-md-4 col-6 mb-3">
                        <label className="mb-2 d-block">Quantity</label>
                        <div
                          className="input-group mb-3"
                          style={{ width: "170px" }}
                        >
                          <button
                            className="btn btn-white border border-secondary px-3"
                            type="button"
                            id="button-addon1"
                            data-mdb-ripple-color="dark"
                            onClick={decrementquantity}
                          >
                            <i className="fas fa-minus"></i>
                          </button>
                          <input
                            type="text"
                            className="form-control text-center border border-secondary"
                            placeholder={prodquantity}
                            aria-label="Example text with button addon"
                            aria-describedby="button-addon1"
                          />
                          <button
                            className="btn btn-white border border-secondary px-3"
                            type="button"
                            id="button-addon2"
                            data-mdb-ripple-color="dark"
                            onClick={incrementquantity}
                          >
                            <i className="fas fa-plus"></i>
                          </button>
                        </div>
                      </div>
                     
                      </div>
                    </div>
                    <div className="col-lg col-sm-6 d-flex justify-content-sm-center justify-content-md-start justify-content-lg-center justify-content-xl-end mb-2">
                      <div className="float-md-end">
                        <button
                          
                          className="btn btn-light border px-2 icon-hover-primary mx-2"
                        >
                          <i className="fas fa-heart fa-lg px-1 text-secondary"></i>
                        </button>
                        <button
                          className="btn btn-light border text-danger icon-hover-danger"
                          onClick={deleteProduct}
                        >
                          {" "}
                          Remove
                        </button>
                      </div>
                    </div>
                  </div> 
  )
}

export default CartData