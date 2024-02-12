import React, {  useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs,addDoc } from "firebase/firestore";
import { auth, storage, db } from "../../firebase/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import {
  MDBInput,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBTextArea,
} from "mdb-react-ui-kit";
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import { usecontext } from "../../Context/Context";
const AadminData = ({data}) => {
   const context = usecontext();
   const navigate = useNavigate();
    const handlenavigation = () =>{
    context.setAdminedit(data)
    navigate(`/adminedit/${data.id}`)
    }

  return (
    <tr>
            <td>
              <div className="d-flex align-items-center">
                <img
                  src={data.productImage}
                  alt=""
                  style={{ width: "45px", height: "45px" }}
                  className="rounded-circle"
                />
                <div className="ms-3">
                  <p className="fw-bold mb-1">{data.productTitle} ({data.productType})</p>
                  <p className="text-muted mb-0">{data.brand}</p>
                </div>
              </div>
            </td>
            <td>
              <p className="fw-normal mb-1">product specification</p>
              {/* <p className="text-muted mb-0">IT department</p> */}
            </td>
            <td>
              <MDBBadge color="success" pill>
                {data.customerSupport}
              </MDBBadge>
            </td>
            <td>{data.price}</td>
            <td>{data.warrenty}</td>
            <td>
              <MDBBtn   color="link" rounded size="sm" onClick={handlenavigation}>
                Edit
              </MDBBtn>
            </td>
          </tr>
  )
}

export default AadminData