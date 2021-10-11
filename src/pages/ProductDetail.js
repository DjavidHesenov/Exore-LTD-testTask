import { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'
import HighlightedProduct from '../components/products/HighlightedProduct'


const ProductDetail = () => {
    const [product, setProduct] = useState()
    const [isLoading, setIsLoading] = useState(false)

    const params = useParams()

    const { productId } = params

    useEffect(() => {
        
    const fetchProduct = async () => {

        setIsLoading(true)
        const response = await fetch(`https://fakestoreapi.com/products/${productId}`)

        if (!response.ok) {
            throw new Error('Could not fetch data.')
        }

        const data = await response.json()

        setProduct(data)
        setIsLoading(false)
    }

        fetchProduct()
    }, [productId])

    return (
        <>
            <HighlightedProduct product={product} isLoading={isLoading} />
        </>
    )
}

export default ProductDetail
