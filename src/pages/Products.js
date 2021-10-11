import React, { useEffect, useState } from 'react'
import Card from '../components/UI/Card'
import ProductList from '../components/products/ProductList';
import LoadingSpinner from '../components/UI/LoadingSpinner'

const Products = () => {
    const [dummyProducts, setDummyProducts] = useState()
    const [loading, setIsLoading] = useState(false)
    const [showCreatedProducts, setShowCreatedProducts] = useState(false)

    const fetchDummyProducts = async () => {
        setIsLoading(true)
        const response = await fetch('https://fakestoreapi.com/products')

        if (!response.ok) {
            throw new Error('Could not fetch data.')
        }

        const data = await response.json()

        setDummyProducts(data)
        setIsLoading(false)
    }

    useEffect(() => {
        fetchDummyProducts()
    }, [])

    const openCreatedProucts = () => {
        setShowCreatedProducts(true)
    }

    const closeCreatedProucts = () => {
        setShowCreatedProducts(false)
    }

    useEffect(() => {
        const func = async () => {
            const response = await fetch(`https://exoreltd-94b51-default-rtdb.firebaseio.com//products.json`);
            const data = await response.json();
            console.log(data)

            // finishing custom products tomorrow (blueprint)
        }
        func()
    }, [])

    return (
        <Card>
            {
                showCreatedProducts ?

                    <>
                        <button className="btn btn-m" onClick={closeCreatedProucts}>Show Fixed Products</button>
                    </>


                    :

                    <>
                        {loading ? <LoadingSpinner /> :
                            <>
                                <button className="btn btn-m" onClick={openCreatedProucts}>Show Created Products</button>
                                <ProductList products={dummyProducts} />
                            </>
                        }
                    </>
            }
        </Card>
    )
}

export default Products
