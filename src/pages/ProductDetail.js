import { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'
import LoadingSpinner from '../components/UI/LoadingSpinner'
import HighlightedProduct from '../components/products/HighlightedProduct'


const ProductDetail = () => {
    const [product, setProduct] = useState()
    const [isLoading, setIsLoading] = useState(false)

    const params = useParams()

    const { productId } = params

    const fetchProduct = async () => {
        setIsLoading(true)
        const response = await fetch(`https://fakestoreapi.com/products/${productId}`)

        if (!response.ok) {
            throw new Error('Could not fetch data.')
        }

        const data = await response.json()

        setProduct(data)
        setIsLoading(false)
        console.log(data)
    }

    useEffect(() => {
        fetchProduct()
    }, [])

    return (
        <>
            {isLoading && LoadingSpinner}
            <HighlightedProduct product={product} />
        </>
    )
}

export default ProductDetail
