import React, { useEffect, useState } from 'react';
import { MDBBtn, MDBContainer } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth"
import { collection, query, where, getDocs } from 'firebase/firestore';
import {auth, db} from "../../firebase/firebase"
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Sliderproductcard from './Sliderproductcard';

const ProductSlider = (props) => {
    const [products, setProducts] = useState([]);

  useEffect(()=>{
    const getProducts = async() =>{
      const productsArray = [];
      const newarray = [];
      const path = `products-${props.type.toUpperCase()}`
      console.log(path);
      await getDocs(collection(db,path)).then((querySnapshot)=>{
        querySnapshot.forEach((doc)=>{
          productsArray.push({...doc.data(),id:doc.id})
        })
        
        setProducts(productsArray)
        console.log(products);
      }).catch((error)=>{
        console.log(error.message); 
      })
    }
    getProducts();
  },[])
  console.log(products);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  }; 
 
  return (
    <Carousel responsive={responsive}>
        {products.map((product)=>(
         
            <Sliderproductcard key={product.id} {...product} />
        ))
        }
</Carousel>
  )
}

export default ProductSlider