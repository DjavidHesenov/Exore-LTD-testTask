import classes from './HighlightedProduct.module.css';

const HighlightedProduct = ({ product }) => {
  console.log(product)
  return (
    <figure className={classes.quote}>
      <h1>{product?.title}</h1>
      <figcaption>{product?.description}</figcaption>
      <p>price: {product?.price}</p>
      <p>rate: {product?.rating.rate}</p>
      <p>count: {product?.rating.count}</p>
      <p>category: {product?.category}</p>
      <img src={product?.image} alt="Loading error" />
    </figure>
  );
};

export default HighlightedProduct;
