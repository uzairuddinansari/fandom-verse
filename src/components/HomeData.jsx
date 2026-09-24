import { useEffect, useState } from "react"; 
import { collection, getDocs } from "firebase/firestore"; 
import { db } from "./firebase"; 
import { Link } from "react-router-dom";
import "../styles/HomeData.css";
import "../styles/Shutter.css";

const HomeData = () => { 
  const [products, setProducts] = useState([]); 
 
  const getProducts = async () => { 
    try { 
      const snapshot = await getDocs( 
        collection(db, "products") 
      ); 
 
      const productData = snapshot.docs.map( (doc) => ({id: doc.id, ...doc.data() }) ); 

      setProducts(productData); 
    } catch (error) { 
      console.error(error); 
    } 
  };
 
  useEffect(() => { 
    getProducts(); 
  }, []); 
 
  return ( 
    <> 
     

      <div> 
        <h1>Products</h1> 
 
        {products.map((product) => ( 
          <div key={product.id}> 
            <img 
              src={product.imageURL} 
              alt={product.name} 
              width="200" 
              height="200" 
            /> 
 
            <h2>{product.name}</h2> 
 
            <p> 
              Price: Rs. {product.price} 
            </p> 
 
            <p> 
              Category: {product.category} 
            </p> 
 
            <p> 
              {product.description} 
            </p> 
          </div> 
        ))} 
      </div> 

     <Link to="/about">About US </Link>
     
    </> 
  ); 
}; 
 
export default HomeData; 