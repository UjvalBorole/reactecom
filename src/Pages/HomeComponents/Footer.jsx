import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    
<footer className="text-center text-lg-start bg-light text-muted">
  {/* <!-- Section: Social media --> */}
  <section className="p-4" style={{"backgroundColor": "rgba(0, 0, 0, 0.05)"}}>
    <div className="container">
      <div className="row d-flex">
        {/* <!-- Left --> */}
        <div className="col-md-6 col-sm-12 mb-2 mb-md-0 d-flex justify-content-center justify-content-md-start">
          <div className="">
            <div className="input-group" style={{"maxWidth": "400px"}}>
              <input type="email" className="form-control border" placeholder="Email" aria-label="Email" aria-describedby="button-addon2" />
              <button className="btn btn-light border" type="button" id="button-addon2" data-mdb-ripple-color="dark">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        {/* <!-- Left --> */}

        {/* <!-- Right --> */}
        <div className="col-md-6 col-sm-12 float-center">
          <div className="float-md-end">
            <Link className="btn btn-icon btn-light text-secondary px-3 border" title="Facebook" target="_blank" href="#"><i className="fab fa-facebook-f fa-lg"></i></Link>
            <Link className="btn btn-icon btn-light text-secondary px-3 border" title="Instagram" target="_blank" href="#"><i className="fab fa-instagram fa-lg"></i></Link>
            <Link className="btn btn-icon btn-light text-secondary px-3 border" title="Youtube" target="_blank" href="#"><i className="fab fa-youtube fa-lg"></i></Link>
            <Link className="btn btn-icon btn-light text-secondary px-3 border" title="Twitter" target="_blank" href="#"><i className="fab fa-twitter fa-lg"></i></Link>
          </div>
        </div>
        {/* <!-- Right --> */}
      </div>
    </div>
  </section>
  {/* <!-- Section: Social media --> */}

  {/* <!-- Section: Links  --> */}
  <section className="">
    <div className="container text-center text-md-start mt-5 mb-4">
      {/* <!-- Grid row --> */}
      <div className="row mt-3">
        {/* <!-- Grid column --> */}
        <div className="col-12 col-lg-3 col-sm-12">
          {/* <!-- Content --> */}
          <Link href="https://mdbootstrap.com/" target="_blank" className="ms-md-2">
            <img src="https://mdbootstrap.com/img/logo/mdb-transaprent-noshadows.png" height="35" />
          </Link>
          <p className="mt-3">
            © 2023 Copyright: MDBootstrap.com.
          </p>
        </div>
        {/* <!-- Grid column --> */}

        {/* <!-- Grid column --> */}
        <div className="col-6 col-sm-4 col-lg-2">
          {/* <!-- Links --> */}
          <h6 className="text-uppercase text-dark fw-bold mb-2">
            Store
          </h6>
          <ul className="list-unstyled mb-4">
            <li><Link className="text-muted" href="#">About us</Link></li>
            <li><Link className="text-muted" href="#">Find store</Link></li>
            <li><Link className="text-muted" href="#">Categories</Link></li>
            <li><Link className="text-muted" href="#">Blogs</Link></li>
          </ul>
        </div>
        {/* <!-- Grid column --> */}

        {/* <!-- Grid column --> */}
        <div className="col-6 col-sm-4 col-lg-2">
          {/* <!-- Links --> */}
          <h6 className="text-uppercase text-dark fw-bold mb-2">
            Information
          </h6>
          <ul className="list-unstyled mb-4">
            <li><Link className="text-muted" href="#">Help center</Link></li>
            <li><Link className="text-muted" href="#">Money refund</Link></li>
            <li><Link className="text-muted" href="#">Shipping info</Link></li>
            <li><Link className="text-muted" href="#">Refunds</Link></li>
          </ul>
        </div>
        {/* <!-- Grid column --> */}

        {/* <!-- Grid column --> */}
        <div className="col-6 col-sm-4 col-lg-2">
          {/* <!-- Links --> */}
          <h6 className="text-uppercase text-dark fw-bold mb-2">
            Support
          </h6>
          <ul className="list-unstyled mb-4">
            <li><Link className="text-muted" href="#">Help center</Link></li>
            <li><Link className="text-muted" href="#">Documents</Link></li>
            <li><Link className="text-muted" href="#">Account restore</Link></li>
            <li><Link className="text-muted" href="#">My orders</Link></li>
          </ul>
        </div>
        {/* <!-- Grid column --> */}

        {/* <!-- Grid column --> */}
        <div className="col-12 col-sm-12 col-lg-3">
          {/* <!-- Links --> */}
          <h6 className="text-uppercase text-dark fw-bold mb-2">Our apps</h6>
          <Link href="#" className="mb-2 d-inline-block"> <img src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/misc/btn-appstore.webp" height="38" /></Link>
          <Link href="#" className="mb-2 d-inline-block"> <img src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/misc/btn-market.webp" height="38" /></Link>
        </div>
        {/* <!-- Grid column --> */}
      </div>
      {/* <!-- Grid row --> */}
    </div>
  </section>
  {/* <!-- Section: Links  --> */}
  <div className="container">
    <div className="py-4 border-top">
      <div className="d-flex justify-content-between">
        {/* <!--- payment ---> */}
        <div className="text-dark">
          <i className="fab fa-lg fa-cc-visa"></i>
          <i className="fab fa-lg fa-cc-amex"></i>
          <i className="fab fa-lg fa-cc-mastercard"></i>
          <i className="fab fa-lg fa-cc-paypal"></i>
        </div>
        {/* <!--- payment ---> */}

        {/* <!--- language selector ---> */}
        <div className="dropdown dropup">
          <Link className="dropdown-toggle text-dark" href="#" id="Dropdown" role="button" data-mdb-toggle="dropdown" aria-expanded="false"> <i className="flag-united-kingdom flag m-0"></i> English </Link>

          <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="Dropdown">
            <li>
              <Link className="dropdown-item" href="#"><i className="flag-united-kingdom flag"></i>English <i className="fa fa-check text-success ms-2"></i></Link>
            </li>
            <li><hr className="dropdown-divider" /></li>
            <li>
              <Link className="dropdown-item" href="#"><i className="flag-poland flag"></i>Polski</Link>
            </li>
            <li>
              <Link className="dropdown-item" href="#"><i className="flag-china flag"></i>中文</Link>
            </li>
            <li>
              <Link className="dropdown-item" href="#"><i className="flag-japan flag"></i>日本語</Link>
            </li>
            <li>
              <Link className="dropdown-item" href="#"><i className="flag-germany flag"></i>Deutsch</Link>
            </li>
            <li>
              <Link className="dropdown-item" href="#"><i className="flag-france flag"></i>Français</Link>
            </li>
            <li>
              <Link className="dropdown-item" href="#"><i className="flag-spain flag"></i>Español</Link>
            </li>
            <li>
              <Link className="dropdown-item" href="#"><i className="flag-russia flag"></i>Русский</Link>
            </li>
            <li>
              <Link className="dropdown-item" href="#"><i className="flag-portugal flag"></i>Português</Link>
            </li>
          </ul>
        </div>
        {/* <!--- language selector ---> */}
      </div>
    </div>
  </div>
</footer>
  )
}

export default Footer