import ProductForm from '../components/products/PorductForm'

const CreateProduct = () => {

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


    return (
        <ProductForm onAddProduct={addProductHandler} />
    )
}

export default CreateProduct
