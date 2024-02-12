import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs,addDoc,deleteDoc,doc } from "firebase/firestore";
import { auth, storage, db } from "../../firebase/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import ReactStars from 'react-stars'
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

const List = ({docid,product,id}) => {
        console.log(product);
    const deleteProduct = async() =>{
        console.log(id,product.id);
        
        await deleteDoc(doc(db,"users",`${id}`,"Likes",`${docid}`)).then(()=>{
            console.log("document Deleted Successfully");
  
        })
      }
      
    const total = (price)=>{
        let overalAlltax = 10/100;
        let overCommission = 10/100;
        let extra = 10/100;
    
        let mrp = parseInt(price);
        let total = mrp + overalAlltax*mrp + overCommission*mrp + extra*mrp;
        return total;
      }
  return (
    <MDBRow className="justify-content-center mb-0">
    <MDBCol md="12" xl="10">
      <MDBCard className="shadow-0 border rounded-3 mt-5 mb-3">
        <MDBCardBody>
          <MDBRow>
            <MDBCol md="12" lg="3" className="mb-4 mb-lg-0">
              <MDBRipple
                rippleColor="light"
                rippleTag="div"
                className="bg-image rounded hover-zoom hover-overlay"
              >
                <MDBCardImage
                  src={product.productImage}
                  fluid
                  className=""
                  width={"150px"}
                />
                <Link to={`/product/${product.id}/${product.productType}`}>
                  <div
                    className="mask"
                    style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                  ></div>
                </Link>
              </MDBRipple>
            </MDBCol>
            <MDBCol md="6">
              <h5>{product.brand} {product.productTitle} {product.productType}</h5>
              <div className="d-flex flex-row">
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
                {/* <span>310</span> */}
              {/* </div> */}
              <div className="mt-1 mb-0 text-muted small">
                <span className="text-primary"> • </span>
                <span>{product.productSpec}</span>
                  <br />
              </div>
              <div className="mb-2 text-muted small">
                <span className="text-primary"> • </span>
                <span>Warrenty:{product.warrenty}</span>
                <span className="text-primary"> • </span>
                <span> Customer Support:{product.customerSupport}</span>
              </div>
              <p className="text-truncate mb-4 mb-md-0">
                {product.spe}
              </p>
            </MDBCol>
            <MDBCol
              md="6"
              lg="3"
              className="border-sm-start-none border-start"
            >
              <div className="d-flex flex-row align-items-center mb-1">
                <h4 className="mb-1 me-1">Rs.{product.price}.00</h4>
                <span className="text-danger">
                  <s>Rs.{total(product.price)}.00</s>
                </span>
              </div>
              <h6 className="text-success">Best Offers</h6>
              <div className="d-flex flex-column mt-4">
                <Link to={`/product/${product.id}/${product.productType}`} className="btn btn-primary" color="primary" size="sm">
                  Details
                </Link>
                <MDBBtn onClick={deleteProduct} outline color="primary" size="sm" className="mt-2">
                  Remove
                </MDBBtn>
              </div>
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  </MDBRow>
  )
}

export default List