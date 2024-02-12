import React, {  useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs,addDoc,doc,updateDoc } from "firebase/firestore";
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

const EditAdmin = () => {

    const context = usecontext();
    const [productTitle, setProductTitle] = useState(context.adminedit.productTitle);
    const [productType, setProductType] = useState(context.adminedit.productType);
    const [description, setDescription] = useState(context.adminedit.description);
    const [brand, setBrand] = useState(context.adminedit.brand);
    const [customerSupport, setCustomerSupport] = useState(context.adminedit.customerSupport);
    const [price, setPrice] = useState(context.adminedit.price);
    const [rating, setRating] = useState(context.adminedit.rating);
    const [warrenty, setWarrenty] = useState(context.adminedit.warrenty);
    const [productImage, setproductImage] = useState(context.adminedit.productImage);
    const [productSpec, setProductSpec] = useState(context.adminedit.productSpec);
  
    const [imageError, setImageError] = useState();
    const [success, setSuccess] = useState();
    const [uploadError, setuploadError] = useState();
    // console.log(context.adminedit);

 const handleProductImg = (e) => {
    const types = ["image/jpg", "image/jpeg", "image/png", "image/PNG","image/webp"];
    e.preventDefault()
    let picfiled = e.target.files[0];
    console.log(picfiled);
    setproductImage(picfiled);
    setImageError("");

    if (picfiled) {
      if (types.includes(picfiled.type)) {
        console.log(picfiled);
      } else {
        setImageError("Please provide the valid image file type");
      }
    } else {
      setImageError("Please select the image file");
    }
  };
  const handleSubmitData = (e) => {
    e.preventDefault()
    const storageRef = ref(
      storage,
      `product-images${productType.toUpperCase()}/${Date.now()}`
    );

    // console.log(storageRef._location.path);
    // console.log(productImage);
    if(productImage === context.adminedit.productImage){
        const itemref = doc(db,`products-${productType.toUpperCase()}`,`${context.adminedit.id}`)
        updateDoc(itemref,{
            productTitle,
            productType,
            description,
            warrenty,
            brand,
            customerSupport,
            price,
            rating,
            productSpec,          
        }).then(()=>{
            setSuccess("Item Update Successfully")
            setTimeout(()=>{
                setSuccess("")
            },3000)

            console.log("Item Update Successfully")
        })
    }else{
    uploadBytes(storageRef,productImage).then(()=>{
        getDownloadURL(storageRef).then((url)=>{
            // if(url ==="")url =context.adminedit.productImage;
            console.log(url);
            const itemref = doc(db,`products-${productType.toUpperCase()}`,`${context.adminedit.id}`)
            updateDoc(itemref,{
                productTitle,
                productType,
                description,
                warrenty,
                brand,
                customerSupport,
                price,
                rating,
                productSpec,
                productImage:url
              
            }).then(()=>{
                setSuccess("Item Update Successfully")
                setTimeout(()=>{
                    setSuccess("")
                },3000)

                console.log("Item Update Successfully")
            })
           
        })
    }).catch(()=>{
      setuploadError("cauldn't upload product image")
    })
}
  };

  return (
    <MDBContainer>
         <h2 className="text-center my-3">Edit Product</h2>
      {success && <div className="text-success">{success}</div>}
      {uploadError && <div className="text-danger">{uploadError}</div>}
    <MDBRow tag="form" className="g-3" onSubmit={handleSubmitData}>
    {/* <form action="" onSubmit={handleSubmitData}> */}
        
      <MDBCol md="4">
        <MDBInput
          value={productTitle}
          name="productTitle"
          onChange={(e) => setProductTitle(e.target.value)}
          id="validationCustom01"
          required
          label="Product Title"
        />
      </MDBCol>
      <MDBCol md="4">
        <MDBInput
          value={productType}
          name="productType"
          onChange={(e) => setProductType(e.target.value)}
          id="validationCustom02"
          label="Product Type"
        />
      </MDBCol>
      <MDBCol md="4">
        <MDBInput
          value={productSpec}
          name="productType"
          onChange={(e) => setProductSpec(e.target.value)}
          id="validationCustom02"
          label="Product Specification"
        />
      </MDBCol>
      <MDBCol md="4">
        <MDBInput
        type="number"
          value={rating}
          name="productType"
          onChange={(e) => setRating(e.target.value)}
          id="validationCustom02"
          label="Product Rating"
        />
      </MDBCol>
      <MDBCol md="4">
        <div className="input-group has-validation">
          <input
            type="file"
            className="form-control"
            id="validationCustomUsername"
            placeholder="Product Image"
            onChange={handleProductImg}
            // required
          />
          <div className="invalid-feedback">
            Please choose a Product Image.
          </div>
          {imageError && <div className="text-danger">{imageError}</div>}
        </div>
      </MDBCol>
      <MDBCol md="6">
        <MDBInput
          value={brand}
          name="brand"
          onChange={(e) => setBrand(e.target.value)}
          id="validationCustom03"
          required
          label="Brand"
        />
      </MDBCol>
      <MDBCol md="6">
        <MDBInput
          value={customerSupport}
          type="email"
          name="Customer Support"
          onChange={(e) => setCustomerSupport(e.target.value)}
          id="validationCustom05"
          required
          label="Customer Support"
        />
      </MDBCol>
      <MDBCol md="6">
        <MDBInput
          value={price}
          name="Price"
          onChange={(e) => setPrice(e.target.value)}
          id="validationCustom05"
          required
          label="Price"
        />
      </MDBCol>
      <MDBCol md="6">
        <MDBInput
        type="number"
          value={warrenty}
          name="warrenty"
          onChange={(e) => setWarrenty(e.target.value)}
          id="validationCustom05"
          required
          label="warrenty"
        />
      </MDBCol>
      <MDBCol md="6">
        <MDBTextArea
          value={description}
          name="description"
          onChange={(e) => setDescription(e.target.value)}
          id="validationCustom05"
          required
          label="description"
        />
      </MDBCol>

      <MDBCol size="12">
        <MDBBtn type="submit">Update Item</MDBBtn>
        <Link to={"/admin"} type="submit" className="btn btn-light border mx-3">Back</Link>
      </MDBCol>
    
    {/* </form> */}
  </MDBRow>
  <br />
  </MDBContainer>
  )
}

export default EditAdmin