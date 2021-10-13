import React, { useEffect, useState } from 'react'
import Card from '../components/UI/Card'
import ProductList from '../components/products/ProductList';
import LoadingSpinner from '../components/UI/LoadingSpinner'

import { useDispatch } from 'react-redux';
import { productsActions } from '../store/customProducts';
import { useSelector } from 'react-redux';

const Products = () => {
    const [dummyProducts, setDummyProducts] = useState()
    const [loading, setIsLoading] = useState(false)
    const [showCreatedProducts, setShowCreatedProducts] = useState(false)

    const dispatch = useDispatch()
    const customProducts = useSelector(state => state.customProducts.products)
    useEffect(() => {

        const fetchDummyProducts = async () => {
            setIsLoading(true)

            try {

                const response = await fetch('https://fakestoreapi.com/products')

                const data = await response.json()
                setDummyProducts(data)
            } catch (err) {
                console.log(err)
            }
            setIsLoading(false)

        }

        fetchDummyProducts()
    }, [])

    const openCreatedProucts = () => {
        setShowCreatedProducts(true)
    }

    const closeCreatedProucts = () => {
        setShowCreatedProducts(false)
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
    }, [dispatch])

    return (
        <Card>
            {
                showCreatedProducts ?

                    <>
                        <button className="btn btn-m" onClick={closeCreatedProucts}>Show Fixed Products</button>
                        <ProductList customProducts={customProducts} isCustom={true}/>
                    </>


                    :

                    <>
                        {loading ? <LoadingSpinner /> :
                            <>
                                <button className="btn btn-m" onClick={openCreatedProucts}>Show Created Products</button>
                                <ProductList products={dummyProducts} isCustom={false} />
                            </>
                        }
                    </>
            }
        </Card>
    )
}

export default Products
