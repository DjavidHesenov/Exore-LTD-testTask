import { useState, useEffect } from 'react'
import ProductItem from './ProductItem';
import classes from './ProductList.module.css';

const ProductList = ({ products }) => {

  const [sortedProducts, setSortedProducts] = useState()
  
    useEffect(() => {
      setSortedProducts(products?.slice(0, 8))
    }, [products])
  
  const showEight = () => {
    setSortedProducts(products?.slice(0, 8))
  }
  const showSixT = () => {
    setSortedProducts(products?.slice(0, 16))

  }
  const showAll = () => {
    setSortedProducts(products  )
  }

  return (
    <>
      <div className={classes.buttons}>
        <button className="btn" onClick={showEight} >Show 8</button>
        <button className="btn" onClick={showSixT} >Show 16</button>
        <button className="btn" onClick={showAll} >Show All</button>
      </div>
      <ul className={classes.list}>
        {sortedProducts?.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            title={product.title}
            category={product.category}
            description={product.description}
            image={product.image}
            price={product.price}
            rating={product.rating}
          />
        ))}
      </ul>
    </>
  );
};

export default ProductList;
