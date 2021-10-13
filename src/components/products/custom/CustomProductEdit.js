import { useState, useEffect, useCallback } from 'react';
import classes from '../HighlightedProduct.module.css';
import Card from '../../UI/Card'
import { useParams, Link } from 'react-router-dom'
import LoadingSpinner from '../../UI/LoadingSpinner';
import Modal from 'react-modal'
import CreateProduct from '../../../pages/CreateProduct'

const CustomProductEdit = () => {

    const [modalOpen, setModalOpen] = useState(false)
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [product, setProduct] = useState()
    const [isLoading, setIsLoading] = useState(false)

    const params = useParams()

    const { productId } = params

    const fetchProduct = useCallback(async () => {

        setIsLoading(true)

        // could use try catch as well

        const response = await fetch(`https://exoreltd-94b51-default-rtdb.firebaseio.com//products/${productId}.json`)

        if (!response.ok) {
            throw new Error('Could not fetch data.')
        }

        const data = await response.json()

        setProduct(data)
        setIsLoading(false)
    }, [productId])

    useEffect(() => {
        fetchProduct()
    }, [fetchProduct, editModalOpen])

    const closeModal = () => {
        setModalOpen(false)
    }

    const openModal = () => {
        setModalOpen(true)
    }

    const closeEditModal = () => {
        setEditModalOpen(false)
    }

    const openEditModal = () => {
        setEditModalOpen(true)
    }

    const deleteProduct = async () => {
        try {
            fetch(`https://exoreltd-94b51-default-rtdb.firebaseio.com/products/${productId}.json`, {
                method: 'DELETE',
            })
        } catch (err) {
            console.log(err);
        }

        fetchProduct()
        setModalOpen(false);
    }


    return (
        <Card>
            <h1 className="centered">{product?.name}</h1>
            {isLoading ? <LoadingSpinner /> :
                <>
                    <figure className={classes.quote}>
                        <figcaption>{product?.desc}</figcaption>
                        <p>price: {product?.price}</p>
                        <p>date: {product?.date}</p>
                        <p>{product?.published ? "Published" : "Not published"}</p>
                    </figure>
                    <div className="centered">
                        <buttton className="btn" onClick={openEditModal} >Edit</buttton>
                        <button className="btn del" onClick={openModal} >Delete</button>
                    </div>
                </>
            }
            <Modal ariaHideApp={false} isOpen={editModalOpen} onRequestClose={closeEditModal}>
                <div className="centered modal-del">
                    <CreateProduct product={product} productId={productId} closeEditModal={closeEditModal} isEditMode={true} />
                </div>
            </Modal>

            <Modal ariaHideApp={false} isOpen={modalOpen} onRequestClose={closeModal} style={{ content: { height: "25rem", width: "70rem", transform: "translate(25%, 20%)" } }} >
                <div className="centered modal-del">
                    <h1>Are you sure about deleting?</h1>
                    <div>
                        <buttton className="btn" onClick={closeModal} >No</buttton>
                        <Link className="btn del" to="/" onClick={deleteProduct} >Yes</Link>
                    </div>
                </div>
            </Modal>
        </Card >
    );
};

export default CustomProductEdit;
