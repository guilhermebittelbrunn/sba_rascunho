import ProductForm from './productForm';

function Modal(props) {
    return (
        <>
            <ProductForm />
            <button
                onClick={(e) => {
                    e.preventDefault();
                    props.changeState(false);
                }}
            >
                ❌
            </button>
        </>
    );
}

export default Modal;
