import { useState, useEffect } from 'react'
import ProductItem from './ProductItem';
import classes from './ProductList.module.css';
import CustomProductItem from './custom/CustomProductItem';

const ProductList = ({ products, isCustom, customProducts }) => {

  const [sortedProducts, setSortedProducts] = useState()
  const [sortedCustomProducts, setSortedCustomProducts] = useState([])

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
    setSortedProducts(products)
  }


  useEffect(() => {
    if (customProducts) {
      const transformedProducts = []
      for (const key in customProducts) {
        const productsObj = {
          id: key,
          ...customProducts[key],
        };

        transformedProducts.push(productsObj);

        setSortedCustomProducts(transformedProducts)
        console.log(transformedProducts)
      }
    }
  }, [customProducts])

  return (
    <>
      {isCustom ?

        <ul className={classes.list}>
          {sortedCustomProducts?.map((customProduct) => (
            <CustomProductItem
              customProduct={customProduct}
              key={customProduct.id}
            />
          ))}
        </ul>

        :
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
      }
    </>
  );
};

export default ProductList;
