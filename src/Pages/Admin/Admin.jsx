import React, { useEffect, useState } from "react";
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
import AadminData from "./AadminData";

export default function Admin() {
  const [productTitle, setProductTitle] = useState("");
  const [productType, setProductType] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [customerSupport, setCustomerSupport] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("");
  const [warrenty, setWarrenty] = useState("");
  const [productImage, setproductImage] = useState("");
  const [productSpec, setProductSpec] = useState("");

  const [imageError, setImageError] = useState();
  const [success, setSuccess] = useState();
  const [uploadError, setuploadError] = useState();

  const GetCurrentUser = () => {
    const [user, setUser] = useState();
    const usersCollectionRef = collection(db, "users");
    useEffect(() => {
      auth.onAuthStateChanged((userlogged) => {
        if (userlogged) {
          const getUsers = async () => {
            const q = query(
              collection(db, "users"),
              where("uid", "==", userlogged.uid)
            );
            const data = await getDocs(q);
            setUser(data.docs.map((d) => ({ ...d.data(), id: d.id })));
          };
          getUsers();
        } else {
          setUser(null);
        }
      });
    }, []);
    return user;
  };

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
    uploadBytes(storageRef,productImage).then(()=>{
        getDownloadURL(storageRef).then((url)=>{
            addDoc(collection(db,`products-${productType.toUpperCase()}`),{
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
            })
            setSuccess("Item added Successfully")
            setBrand("")
            setCustomerSupport("")
            setDescription("")
            setImageError("")
            setPrice("")
            setProductSpec("")
            setProductType("")
            setProductTitle("")
            setRating("")
            setuploadError("")
            setproductImage("")
            setWarrenty("")
            setTimeout(()=>{
                  setSuccess("")
            },3000)
        })
    }).catch(()=>{
      setuploadError("cauldn't upload product image")
    })
  };

  const [laptop, setLaptop] = useState([]);
  const [watch, setWatch] = useState([]);
  const [mobile, setMobile] = useState([]);
  const [headphone, setHeadphone] = useState([]);
  const [products, setProducts] = useState([]);

 
  useEffect(()=>{
    const getProducts = async() =>{
      const productsArray = [];
      const path = `products-LAPTOP`
      // console.log(path);
      await getDocs(collection(db,path)).then((querySnapshot)=>{
        querySnapshot.forEach((doc)=>{
          productsArray.push({...doc.data(),id:doc.id})
        })
        setLaptop(productsArray)
        // console.log(products);
      }).catch((error)=>{
        console.log(error.message); 
      })
    }
    getProducts();
  
  },[handleSubmitData])

  useEffect(()=>{
    const getProducts = async() =>{
      const productsArray = [];
      const path = `products-WATCH`
      // console.log(path);
      await getDocs(collection(db,path)).then((querySnapshot)=>{
        querySnapshot.forEach((doc)=>{
          productsArray.push({...doc.data(),id:doc.id})
        })
        setWatch(productsArray)
        // console.log(products);
      }).catch((error)=>{
        console.log(error.message); 
      })
    }
    getProducts();
  
  },[handleSubmitData])

  useEffect(()=>{
    const getProducts = async() =>{
      const productsArray = [];
      const path = `products-HEADPHONE`
      // console.log(path);
      await getDocs(collection(db,path)).then((querySnapshot)=>{
        querySnapshot.forEach((doc)=>{
          productsArray.push({...doc.data(),id:doc.id})
        })
        setHeadphone(productsArray)
        // console.log(products);
      }).catch((error)=>{
        console.log(error.message); 
      })
    }
    getProducts();
  
  },[handleSubmitData])
 
  useEffect(()=>{
    const getProducts = async() =>{
      const productsArray = [];
      const path = `products-MOBILE`
      // console.log(path);
      await getDocs(collection(db,path)).then((querySnapshot)=>{
        querySnapshot.forEach((doc)=>{
          productsArray.push({...doc.data(),id:doc.id})
        })
        setMobile(productsArray)
        // console.log(products);
      }).catch((error)=>{
        console.log(error.message); 
      })
    }
    getProducts();
  
  },[handleSubmitData])



  // console.log(laptop);
  return (
    <MDBContainer>
      <h2 className="text-center my-3">Admin</h2>
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
                required
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
            <MDBBtn type="submit">Add Item</MDBBtn>
          </MDBCol>
        {/* </form> */}
      </MDBRow>

      <MDBTable align="middle my-5">
        <MDBTableHead>
          <tr>
            <th scope="col">Product</th>
            <th scope="col">Title</th>
            <th scope="col">Status</th>
            <th scope="col">Position</th>
            <th scope="col">warrenty </th>
            <th scope="col">Actions</th>
       
            
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {mobile.length != 0?
          mobile.map((data)=>(
            <AadminData data={data}/>
            
          ))
          :""}

          {
          laptop.map((data)=>(
            <AadminData key={data.id} data={data}/>
            ))
            }
            {
          mobile.map((data)=>(
            <AadminData key={data.id} data={data}/>
            ))
            }
            {
          watch.map((data)=>(
            <AadminData key={data.id} data={data}/>
            ))
            }
        
          
         
          {/* <tr>
            <td>
              <div className="d-flex align-items-center">
                <img
                  src="https://mdbootstrap.com/img/new/avatars/6.jpg"
                  alt=""
                  style={{ width: "45px", height: "45px" }}
                  className="rounded-circle"
                />
                <div className="ms-3">
                  <p className="fw-bold mb-1">Alex Ray</p>
                  <p className="text-muted mb-0">alex.ray@gmail.com</p>
                </div>
              </div>
            </td>
            <td>
              <p className="fw-normal mb-1">Consultant</p>
              <p className="text-muted mb-0">Finance</p>
            </td>
            <td>
              <MDBBadge color="primary" pill>
                Onboarding
              </MDBBadge>
            </td>
            <td>Junior</td>
            <td>
              <MDBBtn color="link" rounded size="sm">
                Edit
              </MDBBtn>
            </td>
          </tr>
          <tr>
            <td>
              <div className="d-flex align-items-center">
                <img
                  src="https://mdbootstrap.com/img/new/avatars/7.jpg"
                  alt=""
                  style={{ width: "45px", height: "45px" }}
                  className="rounded-circle"
                />
                <div className="ms-3">
                  <p className="fw-bold mb-1">Kate Hunington</p>
                  <p className="text-muted mb-0">kate.hunington@gmail.com</p>
                </div>
              </div>
            </td>
            <td>
              <p className="fw-normal mb-1">Designer</p>
              <p className="text-muted mb-0">UI/UX</p>
            </td>
            <td>
              <MDBBadge color="warning" pill>
                Awaiting
              </MDBBadge>
            </td>
            <td>Senior</td>
            <td>
              <MDBBtn color="link" rounded size="sm">
                Edit
              </MDBBtn>
            </td>
          </tr> */}
        </MDBTableBody>
      </MDBTable>
    </MDBContainer>
  );
}
