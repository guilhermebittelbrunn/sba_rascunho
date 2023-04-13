import ProductForm from './productForm';

function Modal(props) {
    return (
        <>
            <ProductForm changeState={props.changeState} func={props.title} state={props.state} item={props.item} />
        </>
    );
}

export default Modal;
