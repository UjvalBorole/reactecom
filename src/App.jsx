import React from "react";
import { MDBBtn, MDBContainer } from "mdb-react-ui-kit";
import Navbar from "./Pages/HomeComponents/Navbar";
import Footer from "./Pages/HomeComponents/Footer";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <Outlet/>
      <Footer />
    </>
  );
}

export default App;
