import React, { useEffect, useState } from 'react'
import Card from '../components/UI/Card'
import ProductList from '../components/products/ProductList';
import LoadingSpinner from '../components/UI/LoadingSpinner'

const Products = () => {
    const [dummyProducts, setDummyProducts] = useState()
    const [loading, setIsLoading] = useState(false)

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

    return (
        <Card>
            {loading  && <LoadingSpinner />}
            <ProductList dummyProducts={dummyProducts} />
        </Card>
    )
}

export default Products
