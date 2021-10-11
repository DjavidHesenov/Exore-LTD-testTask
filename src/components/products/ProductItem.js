import { Link } from 'react-router-dom';

import classes from './ProductItem.module.css';

const ProductItem = (props) => {
  return (
    <li className={classes.item}>
      <figure>
        <blockquote>
          <p>{props.title}</p>
        </blockquote>
        <figcaption>{props.price}$</figcaption>
        <img src={props.image} alt="Loading error" />
      </figure>
      <Link className='btn' to={`/products/${props.id}`} >
        View Fullscreen
      </Link>
    </li>
  );
};

export default ProductItem;
