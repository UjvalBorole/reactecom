import React, { useEffect, useState } from 'react';
import { MDBBtn, MDBContainer } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth"
import { collection, query, where, getDocs } from 'firebase/firestore';
import {auth, db} from "../firebase/firebase"
import ProductSlider from './productsData/ProductSlider';

function Home() {
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

  return (
    <MDBContainer fluid>
    {/* <!--Main Navigation--> */}

{/* <!-- intro --> */}
<section className="pt-3">
  <div className="container">
    <div className="row gx-3">
      <main className="col-lg-9">
        <div className="card-banner p-5 bg-primary rounded-5" style={{"height": "350px"}}>
          <div style={{"maxWidth": "500px"}}>
            <h2 className="text-white">
              Great products with <br />
              best deals
            </h2>
            <p className="text-white">No matter how far along you are in your sophistication as an amateur astronomer, there is always one.</p>
            <Link to="#" className="btn btn-light shadow-0 text-primary"> View more </Link>
          </div>
        </div>
      </main>
      <aside className="col-lg-3">
        <div className="card-banner h-100 rounded-5" style={{backgroundColor: "#f87217"}}>
          <div className="card-body text-center pb-5">
            <h5 className="pt-5 text-white">Amazing Gifts</h5>
            <p className="text-white">No matter how far along you are in your sophistication</p>
            <Link to="#" className="btn btn-outline-light"> View more </Link>
          </div>
        </div>
      </aside>
    </div>
    {/* <!-- row //end --> */}
  </div>
  {/* <!-- container end.// --> */}
</section>
{/* <!-- intro --> */}

{/* <!-- category --> */}
<section>
  <div className="container pt-5">
    <nav className="row gy-4">
      <div className="col-lg-6 col-md-12">
        <div className="row">
          <div className="col-3">
            <Link to="#" className="text-center d-flex flex-column justify-content-center">
              <button type="button" className="btn btn-outline-secondary mx-auto p-3 mb-2" data-mdb-ripple-color="dark">
                <i className="fas fa-couch fa-xl fa-fw"></i>
              </button>
              <div className="text-dark">Interior items</div>
            </Link>
          </div>
          <div className="col-3">
            <Link to="#" className="text-center d-flex flex-column justify-content-center">
              <button type="button" className="btn btn-outline-secondary mx-auto p-3 mb-2" data-mdb-ripple-color="dark">
                <i className="fas fa-basketball-ball fa-xl fa-fw"></i>
              </button>
              <div className="text-dark">Sport and travel</div>
            </Link>
          </div>
          <div className="col-3">
            <Link to="#" className="text-center d-flex flex-column justify-content-center">
              <button type="button" className="btn btn-outline-secondary mx-auto p-3 mb-2" data-mdb-ripple-color="dark">
                <i className="fas fa-ring fa-xl fa-fw"></i>
              </button>
              <div className="text-dark">Jewellery</div>
            </Link>
          </div>
          <div className="col-3">
            <Link to="/product-type/watch" className="text-center d-flex flex-column justify-content-center">
              <button type="button" className="btn btn-outline-secondary mx-auto p-3 mb-2" data-mdb-ripple-color="dark">
                <i className="fas fa-clock fa-xl fa-fw"></i>
              </button>
              <div className="text-dark">Accessories</div>
            </Link>
          </div>
        </div>
      </div>
      <div className="col-lg-6 col-md-12">
        <div className="row">
          <div className="col-3">
            <Link to="#" className="text-center d-flex flex-column justify-content-center">
              <button type="button" className="btn btn-outline-secondary mx-auto p-3 mb-2" data-mdb-ripple-color="dark">
                <i className="fas fa-car-side fa-xl fa-fw"></i>
              </button>
              <div className="text-dark">Automobiles</div>
            </Link>
          </div>
          <div className="col-3">
            <Link to="#" className="text-center d-flex flex-column justify-content-center">
              <button type="button" className="btn btn-outline-secondary mx-auto p-3 mb-2" data-mdb-ripple-color="dark">
                <i className="fas fa-home fa-xl fa-fw"></i>
              </button>
              <div className="text-dark">Home items</div>
            </Link>
          </div>
          <div className="col-3">
            <Link to="#" className="text-center d-flex flex-column justify-content-center">
              <button type="button" className="btn btn-outline-secondary mx-auto p-3 mb-2" data-mdb-ripple-color="dark">
                <i className="fas fa-guitar fa-xl fa-fw"></i>
              </button>
              <div className="text-dark">Musical items</div>
            </Link>
          </div>
          <div className="col-3">
            <Link to="#" className="text-center d-flex flex-column justify-content-center">
              <button type="button" className="btn btn-outline-secondary mx-auto p-3 mb-2" data-mdb-ripple-color="dark">
                <i className="fas fa-book fa-xl fa-fw"></i>
              </button>
              <div className="text-dark">Book, reading</div>
            </Link>
          </div>
        </div>
      </div>
      <div className="col-lg-6 col-md-12">
        <div className="row">
          <div className="col-3">
            <Link to="/product-type/camera" className="text-center d-flex flex-column justify-content-center">
              <button type="button" className="btn btn-outline-secondary mx-auto p-3 mb-2" data-mdb-ripple-color="dark">
                <i className="fas fa-camera fa-xl fa-fw"></i>
              </button>
              <div className="text-dark">Camera</div>
            </Link>
          </div>
          <div className="col-3">
            <Link to="/product-type/headphone" className="text-center d-flex flex-column justify-content-center">
              <button type="button" className="btn btn-outline-secondary mx-auto p-3 mb-2" data-mdb-ripple-color="dark">
                <i className="fas fa-headphones fa-xl fa-fw"></i>
              </button>
              <div className="text-dark">Headphones</div>
            </Link>
          </div>
          <div className="col-3">
            <Link to="#" className="text-center d-flex flex-column justify-content-center">
              <button type="button" className="btn btn-outline-secondary mx-auto p-3 mb-2" data-mdb-ripple-color="dark">
                <i className="fas fa-tshirt fa-xl fa-fw"></i>
              </button>
              <div className="text-dark">Men's clothing</div>
            </Link>
          </div>
          <div className="col-3">
            <Link to="/product-type/laptop" className="text-center d-flex flex-column justify-content-center">
              <button type="button" className="btn btn-outline-secondary mx-auto p-3 mb-2" data-mdb-ripple-color="dark">
                <i className="fas fa-laptop fa-xl fa-fw"></i>
              </button>
              <div className="text-dark">Laptops</div>
            </Link>
          </div>
        </div>
      </div>
      <div className="col-lg-6 col-md-12">
        <div className="row">
          <div className="col-3">
            <Link to="/product-type/mobile" className="text-center d-flex flex-column justify-content-center">
              <button type="button" className="btn btn-outline-secondary mx-auto p-3 mb-2" data-mdb-ripple-color="dark">
                <i className="fas fa-mobile fa-xl fa-fw"></i>
              </button>
              <div className="text-dark">Smartphones</div>
            </Link>
          </div>
          <div className="col-3">
            <Link to="#" className="text-center d-flex flex-column justify-content-center">
              <button type="button" className="btn btn-outline-secondary mx-auto p-3 mb-2" data-mdb-ripple-color="dark">
                <i className="fas fa-tools fa-xl fa-fw"></i>
              </button>
              <div className="text-dark">Tools</div>
            </Link>
          </div>
          <div className="col-3">
            <Link to="#" className="text-center d-flex flex-column justify-content-center">
              <button type="button" className="btn btn-outline-secondary mx-auto p-3 mb-2" data-mdb-ripple-color="dark">
                <i className="fas fa-pencil-ruler fa-xl fa-fw"></i>
              </button>
              <div className="text-dark">Education</div>
            </Link>
          </div>
          <div className="col-3">
            <Link to="#" className="text-center d-flex flex-column justify-content-center">
              <button type="button" className="btn btn-outline-secondary mx-auto p-3 mb-2" data-mdb-ripple-color="dark">
                <i className="fas fa-warehouse fa-xl fa-fw"></i>
              </button>
              <div className="text-dark">Other items</div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  </div>
</section>
{/* <!-- category --> */}

{/* <!-- Products --> */}
<section>
  <div className="container my-5">
    <header className="mb-4">
      <h3>New products</h3>
    </header>

    <div className="row">
    <ProductSlider type="watch"/>
    {/* <ProductSlider type="mobile"/> */}
    <ProductSlider type="laptop"/>
    </div>
  </div>
</section>
{/* <!-- Products --> */}

{/* <!-- Features --> */}
<section>
  <div className="container">
    <div className="card p-4 bg-primary">
      <div className="row align-items-center">
        <div className="col">
          <h4 className="mb-0 text-white">Best products and brands in store</h4>
          <p className="mb-0 text-white-50">Trendy products and text to build on the card title</p>
        </div>
        <div className="col-auto"><Link className="btn btn-white text-primary shadow-0" to="#">Discover</Link></div>
      </div>
    </div>
  </div>
</section>
{/* <!-- Features --> */}

<br />
<br />
       {/* <!-- Feature --> */}
       <section className="">
  <div className="container">
    <div className="row gy-4">
      <div className="col-lg-6">
        <div className="card-banner bg-gray h-100" style={{
                                                      "maxHigth": "200px",
                                                      "backgroundSize": "cover",
                                                      "backgroundPosition": "center",
                                                      "width": "100%",
                                                      "backgroundRepeat": "no-repeat",
                                                      "top":" 50%",
                                                      backgroundImage: "url('https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/banners/banner-item2.webp')"}}>
          <div className="p-3 p-lg-5" style={{"maxWidth":" 70%"}}>
            <h3 className="text-dark">Best products & brands in our store at 80% off</h3>
            <p>That's true but not always</p>
            <button className="btn btn-warning shadow-0" to="#"> Claim offer </button>
          </div>
        </div>
      </div>
      <div className="col-lg-6">
        <div className="row mb-3 mb-sm-4 g-3 g-sm-4">
          <div className="col-6 d-flex">
            <div className="card w-100 bg-primary" style={{"maxHigth": "200px"}}>
              <div className="card-body">
                <h5 className="text-white">Gaming toolset</h5>
                <p className="text-white-50">Technology for cyber sport</p>
                <Link className="btn btn-outline-light btn-sm" to="#">Learn more</Link>
              </div>
            </div>
          </div>
          <div className="col-6 d-flex">
            <div className="card w-100 bg-primary" style={{"maxHigth": "200px"}}>
              <div className="card-body">
                <h5 className="text-white">Quality sound</h5>
                <p className="text-white-50">All you need for music</p>
                <Link className="btn btn-outline-light btn-sm" to="#">Learn more</Link>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- row.// --> */}

        <div className="card bg-success" style={{"maxHigth": "200px"}}>
          <div className="card-body">
            <h5 className="text-white">Buy 2 items, With special gift</h5>
            <p className="text-white-50" style={{"maxWidth":"400px"}}>Buy one, get one free marketing strategy helps your business improves the brand by sharing the profits</p>
            <Link className="btn btn-outline-light btn-sm" to="#">Learn more</Link>
          </div>
        </div>
      </div>
      {/* <!-- col.// --> */}
    </div>
    {/* <!-- row.// --> */}
  </div>
  {/* <!-- container end.// --> */}
</section>
{/* <!-- Feature --> */}

{/* <!-- Recently viewed --> */}
<section className="mt-5 mb-4">
  <div className="container text-dark">
    <header className="">
      <h3 className="section-title">Recently viewed</h3>
    </header>

    <div className="row gy-3">
      <div className="col-lg-2 col-md-4 col-4">
        <Link to="#" className="img-wrap">
          <img height="200" width="200" className="img-thumbnail" src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/1.webp" />
        </Link>
      </div>
      {/* <!-- col.// --> */}
      <div className="col-lg-2 col-md-4 col-4">
        <Link to="#" className="img-wrap">
          <img height="200" width="200" className="img-thumbnail" src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/2.webp" />
        </Link>
      </div>
      {/* <!-- col.// --> */}
      <div className="col-lg-2 col-md-4 col-4">
        <Link to="#" className="img-wrap">
          <img height="200" width="200" className="img-thumbnail" src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/3.webp" />
        </Link>
      </div>
      {/* <!-- col.// --> */}
      <div className="col-lg-2 col-md-4 col-4">
        <Link to="#" className="img-wrap">
          <img height="200" width="200" className="img-thumbnail" src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/4.webp" />
        </Link>
      </div>
      {/* <!-- col.// --> */}
      <div className="col-lg-2 col-md-4 col-4">
        <Link to="#" className="img-wrap">
          <img height="200" width="200" className="img-thumbnail" src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/5.webp" />
        </Link>
      </div>
      {/* <!-- col.// --> */}
      <div className="col-lg-2 col-md-4 col-4">
        <Link to="#" className="img-wrap">
          <img height="200" width="200" className="img-thumbnail" src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/6.webp" />
        </Link>
      </div>
    </div>
  </div>
</section>
{/* <!-- Recently viewed --> */}
{/* <!-- Recommended --> */}
<section>
  <div className="container my-5">
    <header className="mb-4">
      <h3>Recommended</h3>
    </header>

    <div className="row">
      <div className="col-lg-3 col-md-6 col-sm-6 border">
        <div className="card my-2 shadow-0">
          <Link to="#" className="border">
            <img src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/9.webp" className="card-img-top rounded-2" style={{"aspectRatio": "1 / 1"}}/>
          </Link>
          <div className="card-body p-0 pt-3">
            <Link to="#!" className="btn btn-light border px-2 pt-2 float-end icon-hover"><i className="fas fa-heart fa-lg px-1 text-secondary"></i></Link>
            <h5 className="card-title">$17.00</h5>
            <p className="card-text mb-0">Blue jeans shorts for men</p>
            <p className="text-muted">
              Sizes: S, M, XL
            </p>
          </div>
        </div>
      </div>
      <div className="col-lg-3 col-md-6 col-sm-6">
        <div className="card my-2 shadow-0">
          <Link to="#" className="">
            <img src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/10.webp" className="card-img-top rounded-2"style={{"aspectRatio": "1 / 1"}} />
          </Link>
          <div className="card-body p-0 pt-2">
            <Link to="#!" className="btn btn-light border px-2 pt-2 float-end icon-hover"><i className="fas fa-heart fa-lg px-1 text-secondary"></i></Link>
            <h5 className="card-title">$9.50</h5>
            <p className="card-text mb-0">Slim fit T-shirt for men</p>
            <p className="text-muted">
              Sizes: S, M, XL
            </p>
          </div>
        </div>
      </div>
      <div className="col-lg-3 col-md-6 col-sm-6">
        <div className="card my-2 shadow-0">
          <Link to="#" className="">
            <img src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/11.webp" className="card-img-top rounded-2" style={{"aspectRatio": "1 / 1"}}/>
          </Link>
          <div className="card-body p-0 pt-2">
            <Link to="#!" className="btn btn-light border px-2 pt-2 float-end icon-hover"><i className="fas fa-heart fa-lg px-1 text-secondary"></i></Link>
            <h5 className="card-title">$29.95</h5>
            <p className="card-text mb-0">Modern product name here</p>
            <p className="text-muted">
              Sizes: S, M, XL
            </p>
          </div>
        </div>
      </div>
      <div className="col-lg-3 col-md-6 col-sm-6">
        <div className="card my-2 shadow-0">
          <Link to="#" className="">
            <img src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/12.webp" className="card-img-top rounded-2" style={{"aspectRatio": "1 / 1"}}/>
          </Link>
          <div className="card-body p-0 pt-2">
            <Link to="#!" className="btn btn-light border px-2 pt-2 float-end icon-hover"><i className="fas fa-heart fa-lg px-1 text-secondary"></i></Link>
            <h5 className="card-title">$29.95</h5>
            <p className="card-text mb-0">Modern product name here</p>
            <p className="text-muted">
              Material: Jeans
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
{/* <!-- Recommended --> */}
<br />

<section>
  <div className="container">
    <div className="px-4 pt-3 border">
      <div className="row pt-1">
        <div className="col-lg-3 col-md-6 mb-3 d-flex">
          <div className="d-flex align-items-center">
            <div className="badge badge-warning p-2 rounded-4 me-3">
              <i className="fas fa-thumbs-up fa-2x fa-fw"></i>
            </div>
            <span className="info">
              <h6 className="title">Reasonable prices</h6>
              <p className="mb-0">Have you ever finally just</p>
            </span>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 mb-3 d-flex">
          <div className="d-flex align-items-center">
            <div className="badge badge-warning p-2 rounded-4 me-3">
              <i className="fas fa-plane fa-2x fa-fw"></i>
            </div>
            <span className="info">
              <h6 className="title">Worldwide shipping</h6>
              <p className="mb-0">Have you ever finally just</p>
            </span>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 mb-3 d-flex">
          <div className="d-flex align-items-center">
            <div className="badge badge-warning p-2 rounded-4 me-3">
              <i className="fas fa-star fa-2x fa-fw"></i>
            </div>
            <span className="info">
              <h6 className="title">Best ratings</h6>
              <p className="mb-0">Have you ever finally just</p>
            </span>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 mb-3 d-flex">
          <div className="d-flex align-items-center">
            <div className="badge badge-warning p-2 rounded-4 me-3">
              <i className="fas fa-phone-alt fa-2x fa-fw"></i>
            </div>
            <span className="info">
              <h6 className="title">Help center</h6>
              <p className="mb-0">Have you ever finally just</p>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
<br />
<br />

    </MDBContainer>
  );
}

export default Home;
