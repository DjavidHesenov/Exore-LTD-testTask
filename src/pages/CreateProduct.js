import ProductForm from '../components/products/PorductForm'
import { useParams } from 'react-router-dom'


const CreateProduct = ({ isEditMode, closeEditModal, product }) => {
    const params = useParams()

    const addProductHandler = async (productData) => {
        const response = await fetch('https://exoreltd-94b51-default-rtdb.firebaseio.com/products.json', {
            method: 'POST',
            body: JSON.stringify(productData),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Could not create quote.');
        }

        return null;
    }

    const EditProductHandler = async (productData) => {
        const { productId } = params

        //  could also use try catch but showed this to show different approach

        const dateResponse = await fetch(`https://exoreltd-94b51-default-rtdb.firebaseio.com//products/${productId}.json`);
        const dateData = await dateResponse.json();

        const date = dateData.date

        const response = await fetch(`https://exoreltd-94b51-default-rtdb.firebaseio.com/products/${productId}.json`, {
            method: 'PUT',
            body: JSON.stringify({ ...productData, date })
        });
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Could not create quote.');
        }
        closeEditModal()
        return null;
    }

    return (
        <ProductForm product={product} onAddProduct={addProductHandler} onEditProduct={EditProductHandler} isEditMode={isEditMode} />
    )
}

export default CreateProduct
