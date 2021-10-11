import classes from './HighlightedProduct.module.css';
import LoadingSpinner from '../UI/LoadingSpinner'
import Card from '../UI/Card'

const HighlightedProduct = ({ product, isLoading }) => {
  return (
    <Card>
      <h1 className="centered">{product?.title}</h1>
      {isLoading ? <LoadingSpinner /> :
        <figure className={classes.quote}>
          <figcaption>{product?.description}</figcaption>
          <p>price: {product?.price}</p>
          <p>rate: {product?.rating.rate}</p>
          <p>count: {product?.rating.count}</p>
          <p>category: {product?.category}</p>
          <img src={product?.image} alt="Loading error" />
        </figure>
      }
    </Card >
  );
};

export default HighlightedProduct;
