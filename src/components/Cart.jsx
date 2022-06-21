function Cart(props){
    const {quantity = 0, handleBaskeShow = Function.prototype} = props;

    return <div className="cart green 2 black-text" onClick={handleBaskeShow}>
        <i className="material-icons">shopping_cart</i>
        {quantity ? <span className="cart-quantity">{quantity}</span> : null}
    </div>
}
export {Cart}