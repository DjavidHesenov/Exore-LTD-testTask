import { useState, useEffect } from 'react';
import { Prompt } from 'react-router-dom'

import Card from '../UI/Card';
import LoadingSpinner from '../UI/LoadingSpinner';
import classes from './PorductForm.module.css';

const ProductForm = (props) => {
  const [isEntering, setIsEntering] = useState(false)
  const [nameInput, setNameInput] = useState('')
  const [descInput, setDescInput] = useState('')
  const [priceInput, setPriceInput] = useState(1)
  const [checkBoxInput, setCheckBoxInput] = useState(false)
w  const [name, setName] = useState()
  const [desc, setDesc] = useState()
  const [price, setPrice] = useState()
  const [published, setPublished] = useState()

  const { isEditMode } = props
  
  useEffect(() => {
    if (isEditMode) {
      
      setName(props.product.name)
      setDesc(props.product.desc)
      setPrice(props.product.price)
      setPublished(props.product.published)

      setNameInput(name)
      setDescInput(desc)
      setPriceInput(price)
      setCheckBoxInput(published)
    }
  }, [isEditMode, name, desc, price, published])

  let formIsValid = false

  if (nameInput === '' || descInput === '' || priceInput === 0 || priceInput === '') {
    formIsValid = false
  }
  else {
    formIsValid = true
  }

  const submitFormHandler = (event) => {
    event.preventDefault();

    const showDate = new Date()

    const month = showDate.getMonth() + 1

    const date = showDate.getDate() + '/' + month + '/' + showDate.getFullYear()


    if (!isEditMode) {
      props.onAddProduct({ name: nameInput, desc: descInput, price: priceInput, published: checkBoxInput, date })
    } else {
      props.onEditProduct({ name: nameInput, desc: descInput, price: priceInput, published: checkBoxInput, date })

    }
    setCheckBoxInput(false)
    setNameInput('')
    setDescInput('')
    setPriceInput(0)
  }

  const formFocusedHandler = () => {
    setIsEntering(true)
  }

  const finishEnteringHandler = () => {
    setIsEntering(false)
  }

  return (
    <>
      <Prompt when={isEntering} message={() => 'Sure about leaving? Entered data will be lost.'} />
      <Card>
        <form onFocus={formFocusedHandler} className={classes.form} onSubmit={submitFormHandler}>
          {props.isLoading && (
            <div className={classes.loading}>
              <LoadingSpinner />
            </div>
          )}

          <div className={classes.control}>
            <label htmlFor='author'>Name</label>
            <input type='text' id='author' value={nameInput} onChange={(event) => { setNameInput(event.target.value) }} />
          </div>
          <div className={classes.control}>
            <label htmlFor='text'>Text</label>
            <textarea id='text' rows='5' value={descInput} onChange={(event) => { setDescInput(event.target.value) }} ></textarea>
          </div>
          <div className={classes.control}>
            <label htmlFor='price'>Price ($) </label>
            <input type="number" id='price' value={priceInput} onChange={(event) => { setPriceInput(event.target.value) }} />
          </div>
          <div>
            <h4>Published</h4>
            <label className={classes.switch}>
              <input type="checkbox" id="published" checked={checkBoxInput} onChange={(event) => { setCheckBoxInput(event.target.checked) }} />
              <span className={`${classes.slider} ${classes.round}`}></span>
            </label>
          </div>
          <div className={classes.actions}>
            <button onClick={finishEnteringHandler} className={formIsValid ? `btn centered` : 'disabled centered'} disabled={!formIsValid}>{props.isEditMode ? "Edit Quote" : "Add Quote"}</button>
          </div>
        </form>
      </Card>
    </>
  );
};

export default ProductForm;
