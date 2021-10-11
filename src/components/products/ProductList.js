import { useState, useEffect } from 'react'
import ProductItem from './ProductItem';
import classes from './ProductList.module.css';

const ProductList = ({ dummyProducts }) => {

  const [sortedProducts, setSortedProducts] = useState()
  console.log(dummyProducts)
  
    useEffect(() => {
      setSortedProducts(dummyProducts?.slice(0, 8))
    }, [dummyProducts])
  
  const showEight = () => {
    setSortedProducts(dummyProducts?.slice(0, 8))
  }
  const showSixT = () => {
    setSortedProducts(dummyProducts?.slice(0, 16))

  }
  const showAll = () => {
    setSortedProducts(dummyProducts)
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
