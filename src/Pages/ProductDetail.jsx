import React, { useEffect, useState } from "react";
import { MDBBtn, MDBContainer } from "mdb-react-ui-kit";
import {
  collection,
  query,
  where,
  getDoc,
  getDocs,
  doc,
  addDoc,
} from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { Link, useParams } from "react-router-dom";
import ReactStars from "react-stars";
import ProductOtherData from "./productsData/ProductOtherData";

const ProductDetail = () => {
  const { id, name } = useParams();
  // console.log(name);
  const [data, setData] = useState([]);
  const [selected, setSelcted] = useState({ spec: "active" });
  const [successMsg, setSuccessMsg] = useState();
  const [errorMsg, setErrorMsg] = useState();
  const [cart, setCart] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      const productsArray = [];

      const path = `products-${name.toUpperCase()}`;

      console.log(doc.id);

      const docref = doc(db, path, id);

      const data = await getDoc(docref);
      if (data.exists()) {
        // console.log(data.data())
        setData(data.data());
      } else {
        console.log("No such document!");
      }
    };
    getProducts();
  }, []);
  // console.log(data);
  const [detail, setDetail] = useState({
    spec: data.productSpec,
    desc: data.description,
  });
  useEffect(() => {
    setDetail({ spec: data.productSpec, desc: data.description });
  }, [setDetail, data]);
  // console.log(detail)

  //add to cart
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
  const loggedinuser = GetCurrentUser();

  const addToCart = () => {
    if (loggedinuser) {
      addDoc(collection(db, `cart-${loggedinuser[0].uid}`), {
        data,
        quantity: 1,
      })
        .then(() => {
          setSuccessMsg("Product added to Cart Successfully");
          setCart(true);
        })
        .catch((error) => {
          setErrorMsg(error);
        });
    } else {
      setErrorMsg("You need to login first");
    }
  };

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
        if(doc.data.productTitle === data.productTitle)setCart(true);
        console.log(doc.data.productTitle,data.productTitle)
      })
      // console.log(cartdata);
    }).catch('Error error error')
  }
  getCartData();
  // console.log(cartdata);
}

  
const addLike = async()=>{
  if(loggedinuser){
    await addDoc(collection(db,"users",`${loggedinuser[0].uid}`,"Likes"),{
      product,quantity:1
    }).then(()=>{
      setSuccessMsg('Product added to Likes Successfully');
      setTimeout(()=>{
        setSuccessMsg("");
      },3000)
    }).catch((error)=>{
      setErrorMsg(error);
      setTimeout(()=>{
        setErrorMsg("");
      },3000)
    })
  }else{
    setErrorMsg('You need to login first');
  }
 }

  return (
    <MDBContainer fluid>
      <header>
        {/* <!-- Heading --> */}
        <div className="bg-primary">
          <div className="container py-4">
            {/* <!-- Breadcrumb --> */}
            <nav className="d-flex">
              <h6 className="mb-0">
                <Link to="/" className="text-white-50">
                  Home
                </Link>
                <span className="text-white-50 mx-2"> / </span>
                <Link to="" className="text-white-50">
                  Product
                </Link>
                <span className="text-white-50 mx-2"> / </span>
                <Link to="" className="text-white">
                  <u>Details</u>
                </Link>
              </h6>
            </nav>
            {/* <!-- Breadcrumb --> */}
          </div>
        </div>
        {/* <!-- Heading --> */}
      </header>

      {/* <!-- content --> */}
      <section className="py-5">
        {successMsg && <div className="text-success">{successMsg}</div>}
        {errorMsg && <div className="text-danger">{errorMsg}</div>}
        <div className="container">
          <div className="row gx-5">
            <aside className="col-lg-6">
              <div
                className="border rounded-4 mb-3 d-flex justify-content-center py-5"
                style={{ maxWidth: "700px", maxHeight: "1000px" }}
              >
                <Link
                  data-fslightbox="mygalley"
                  className="rounded-4"
                  target="_blank"
                  data-type="image"
                >
                  <img
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100vh",
                      margin: "auto",
                    }}
                    className="rounded-4 fit"
                    src={data.productImage}
                  />
                </Link>
              </div>
              {/* <div className="d-flex justify-content-center mb-3">
          <Link data-fslightbox="mygalley" className="border mx-1 rounded-2 item-thumb" target="_blank" data-type="image" to="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/detail1/big1.webp" >
            <img width="60" height="60" className="rounded-2" src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/detail1/big1.webp" />
          </Link>
          <Link data-fslightbox="mygalley" className="border mx-1 rounded-2 item-thumb" target="_blank" data-type="image" to="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/detail1/big2.webp" >
            <img width="60" height="60" className="rounded-2" src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/detail1/big2.webp" />
          </Link>
          <Link data-fslightbox="mygalley" className="border mx-1 rounded-2 item-thumb" target="_blank" data-type="image" to="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/detail1/big3.webp" >
            <img width="60" height="60" className="rounded-2" src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/detail1/big3.webp" />
          </Link>
          <Link data-fslightbox="mygalley" className="border mx-1 rounded-2 item-thumb" target="_blank" data-type="image" to="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/detail1/big4.webp">
            <img width="60" height="60" className="rounded-2" src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/detail1/big4.webp" />
          </Link>
          <Link data-fslightbox="mygalley" className="border mx-1 rounded-2 item-thumb" target="_blank" data-type="image" to="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/detail1/big.webp" >
            <img width="60" height="60" className="rounded-2" src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/detail1/big.webp" />
          </Link>
        </div> */}
              {/* <!-- thumbs-wrap.// --> */}
              {/* <!-- gallery-wrap .end// --> */}
            </aside>
            <main className="col-lg-6">
              <div className="ps-lg-3">
                <h4 className="title text-dark">
                  {data.brand} {data.productTitle} {data.productType}
                </h4>
                <div className="d-flex flex-row my-3">
                  {data.rating ? (
                    <div className="d-flex flex-row">
                      <div className="text-warning ">
                        <ReactStars
                          size={20}
                          half={true}
                          value={data.rating}
                          edit={false}
                        />
                      </div>
                      <span className="ms-1 mt-1 text-warning">
                        {data.rating}
                      </span>
                    </div>
                  ) : (
                    <div className="d-flex flex-row">
                      <div className="text-warning ">
                        <ReactStars
                          size={20}
                          half={true}
                          value={4.5}
                          edit={false}
                        />
                      </div>
                      <span className="ms-1 mt-1 text-warning">4.5</span>
                    </div>
                  )}
                  <span className="text-muted mt-1">
                    <i className="fas fa-shopping-basket fa-sm mx-1"></i>154
                    orders
                  </span>
                  <span className="text-success ms-2 mt-1">In stock</span>
                </div>

                <div className="mb-3">
                  <span className="h5">Rs.{data.price}</span>
                  <span className="text-muted">/per box</span>
                </div>

                <p>{data.productSpec}</p>

                <div className="row">
                  <dt className="col-3">Type:</dt>
                  <dd className="col-9">{data.productType}</dd>

                  <dt className="col-3">Brand</dt>
                  <dd className="col-9">{data.brand}</dd>
                </div>

                <hr />

                {/* <div className="row mb-4">
            <div className="col-md-4 col-6">
              <label className="mb-2">Size</label>
              <select className="form-select border border-secondary" style={{"height": "35px"}}>
                <option>Small</option>
                <option>Medium</option>
                <option>Large</option>
              </select>
            </div>
            <div className="col-md-4 col-6 mb-3">
              <label className="mb-2 d-block">Quantity</label>
              <div className="input-group mb-3" style={{"width": "170px"}}>
                <button className="btn btn-white border border-secondary px-3" type="button" id="button-addon1" data-mdb-ripple-color="dark">
                  <i className="fas fa-minus"></i>
                </button>
                <input type="text" className="form-control text-center border border-secondary" placeholder="14" aria-label="Example text with button addon" aria-describedby="button-addon1" />
                <button className="btn btn-white border border-secondary px-3" type="button" id="button-addon2" data-mdb-ripple-color="dark">
                  <i className="fas fa-plus"></i>
                </button>
              </div>
            </div>
          </div> */}
                {/* <Link to="#" className="btn btn-warning shadow-0 mx-2">
                  {" "}
                  Buy now{" "}
                </Link> */}
                {cart == false ? (
                  <button
                    className="btn btn-warning shadow-0 mx-2"
                    onClick={addToCart}
                  >
                    {" "}
                    <i className="me-1 fa fa-shopping-basket"></i> Add to cart{" "}
                  </button>
                ) : (
                  <Link  to="/cart" className="btn btn-success shadow-0 mx-2">
                    {" "}
                    <i className="me-1 fa fa-shopping-basket"></i>Go to cart{" "}
                  </Link>
                )}
                <button
                  onClick={addLike}
                  className="btn btn-light border border-secondary py-2 icon-hover px-3 mx-2"
                >
                  {" "}
                  <i className="me-1 fa fa-heart fa-lg"></i> Save{" "}
                </button>
              </div>
            </main>
          </div>
        </div>
      </section>
      {/* <!-- content --> */}

      <section className="bg-light border-top py-4">
        <div className="container">
          <div className="row gx-4">
            <div className="col-lg-8 mb-4">
              <div className="border rounded-2 px-3 py-2 bg-white">
                {/* <!-- Pills navs --> */}
                <ul
                  className="nav nav-pills nav-justified mb-3"
                  id="ex1"
                  role="tablist"
                >
                  <li className="nav-item d-flex" role="presentation">
                    <button
                      className={`nav-link d-flex align-items-center justify-content-center w-100 ${selected.spec}`}
                      id="ex1-tab-1"
                      data-mdb-toggle="pill"
                      role="tab"
                      aria-controls="ex1-pills-1"
                      aria-selected="false"
                      onClick={(e) => {
                        setDetail({
                          spec: data.productSpec,
                          desc: data.description,
                        });
                        setSelcted({ spec: "active" });
                      }}
                    >
                      Specification
                    </button>
                  </li>
                  <li className="nav-item d-flex" role="presentation">
                    <button
                      className={`nav-link d-flex align-items-center justify-content-center w-100 ${selected.warr}`}
                      id="ex1-tab-2"
                      data-mdb-toggle="pill"
                      role="tab"
                      aria-controls="ex1-pills-2"
                      aria-selected="false"
                      onClick={(e) => {
                        setDetail({ spec: data.warrenty, desc: "warrenty" });
                        setSelcted({ warr: "active" });
                      }}
                    >
                      Warranty info
                    </button>
                  </li>
                  <li className="nav-item d-flex" role="presentation">
                    <button
                      className={`nav-link d-flex align-items-center justify-content-center w-100 ${selected.shop}`}
                      id="ex1-tab-3"
                      data-mdb-toggle="pill"
                      role="tab"
                      aria-controls="ex1-pills-3"
                      aria-selected="false"
                      onClick={(e) => {
                        setDetail({ spec: data.warrenty, desc: "undefine" });
                        setSelcted({ shop: "active" });
                      }}
                    >
                      Shipping info
                    </button>
                  </li>
                  <li className="nav-item d-flex" role="presentation">
                    <button
                      className={`nav-link d-flex align-items-center justify-content-center w-100 ${selected.cs}`}
                      id="ex1-tab-4"
                      data-mdb-toggle="pill"
                      role="tab"
                      aria-controls="ex1-pills-4"
                      aria-selected="false"
                      onClick={(e) => {
                        setDetail({ spec: data.customerSupport, desc: "cs" });
                        setSelcted({ cs: "active" });
                      }}
                    >
                      Customer Support
                    </button>
                  </li>
                </ul>
                {/* <!-- Pills navs --> */}

                <ProductOtherData detail={detail} />
              </div>
            </div>
            <div className="col-lg-4">
              <div className="px-0 border rounded-2 shadow-0">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Similar items</h5>
                    <div className="d-flex mb-3">
                      <Link to="#" className="me-3">
                        <img
                          src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/8.webp"
                          style={{ minWidth: "96px", height: "96px" }}
                          className="img-md img-thumbnail"
                        />
                      </Link>
                      <div className="info">
                        <Link to="#" className="nav-link mb-1">
                          Rucksack Backpack Large <br />
                          Line Mounts
                        </Link>
                        <strong className="text-dark"> $38.90</strong>
                      </div>
                    </div>

                    <div className="d-flex mb-3">
                      <Link to="#" className="me-3">
                        <img
                          src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/9.webp"
                          style={{ minWidth: "96px", height: "96px" }}
                          className="img-md img-thumbnail"
                        />
                      </Link>
                      <div className="info">
                        <Link to="#" className="nav-link mb-1">
                          Summer New Men's Denim <br />
                          Jeans Shorts
                        </Link>
                        <strong className="text-dark"> $29.50</strong>
                      </div>
                    </div>

                    <div className="d-flex mb-3">
                      <Link to="#" className="me-3">
                        <img
                          src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/10.webp"
                          style={{ minWidth: "96px", height: "96px" }}
                          className="img-md img-thumbnail"
                        />
                      </Link>
                      <div className="info">
                        <Link to="#" className="nav-link mb-1">
                          {" "}
                          T-shirts with multiple colors, for men and lady{" "}
                        </Link>
                        <strong className="text-dark"> $120.00</strong>
                      </div>
                    </div>

                    <div className="d-flex">
                      <Link to="#" className="me-3">
                        <img
                          src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/11.webp"
                          style={{ minWidth: "96px", height: "96px" }}
                          className="img-md img-thumbnail"
                        />
                      </Link>
                      <div className="info">
                        <Link to="#" className="nav-link mb-1">
                          {" "}
                          Blazer Suit Dress Jacket for Men, Blue color{" "}
                        </Link>
                        <strong className="text-dark"> $339.90</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MDBContainer>
  );
};

export default ProductDetail;
