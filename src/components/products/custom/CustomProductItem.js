import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal'
import { useDispatch } from 'react-redux';
import { productsActions } from '../../../store/customProducts';

import classes from '../ProductItem.module.css';
const CustomProductItem = (props) => {

  const [modalOpen, setModalOpen] = useState(false)

  const dispatch = useDispatch()

  const closeModal = () => {
    setModalOpen(false)
  }

  const openModal = () => {
    setModalOpen(true)
  }


  useEffect(() => {
    const fetchCustomProducts = async () => {
      try {
        const response = await fetch(`https://exoreltd-94b51-default-rtdb.firebaseio.com//products.json`);
        const data = await response.json();
        dispatch(productsActions.setProducts(data))
      } catch (err) {
        console.log(err)
      }
    }

    fetchCustomProducts()
  }, [modalOpen, dispatch])


  const deleteProduct = async () => {
    try {
      fetch(`https://exoreltd-94b51-default-rtdb.firebaseio.com/products/${props.customProduct.id}.json`, {
        method: 'DELETE',
      })
    } catch (err) {
      console.log(err);
    }

    setModalOpen(false);
  }

  return (
    <li className={classes.item}>
      <figure>
        <blockquote>
          <p>{props.customProduct.name}</p>
          <p>{props.customProduct.date}</p>
          <p>{props.customProduct.desc}</p>
          <p>{props.customProduct.published ? "Published" : "Not published"}</p>
        </blockquote>
        <figcaption>{props.customProduct.price}$</figcaption>
      </figure>
      <Link className='btn' to={`/products-custom/${props.customProduct.id}`} >
        Edit
      </Link>
      <button className="btn del" onClick={openModal} >
        Delete
      </button>
      <Modal ariaHideApp={false} isOpen={modalOpen} onRequestClose={closeModal} style={{ content: { height: "25rem", width: "70rem", transform: "translate(25%, 20%)" } }} >
        <div className="centered modal-del">
          <h1>Are you sure about deleting?</h1>
          <div>
            <buttton className="btn" onClick={closeModal} >No</buttton>
            <Link className="btn del" to="/" onClick={deleteProduct} >Yes</Link>
          </div>
        </div>
      </Modal>
    </li>
  );
};

export default CustomProductItem;
