
import React, { useContext,useState } from 'react';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartContext from '../../Store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';


const Cart = (props) => {

  const[isCheckout,setIsCheckout]=useState(false);
  const[isSubmitting,setIsSubmitting]=useState(false);
  const[didSubmit,setdidSubmit]=useState(false);
  const cartCtx=useContext(CartContext);
  const totalAmount=`$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItem =cartCtx.items.length>0;

  const CartItemRemoveHandler=id=>{
   cartCtx.removeItem(id);
  };
  const cartItemAddHandler=item=>{
     cartCtx.addItem({...item,amount:1})
  }
  const orderHandler=id=>{
     setIsCheckout(true);
   };

   const submitOrderHandler=async(userData)=>{
    setIsSubmitting(true);
      await fetch('https://myapp7-13f9b-default-rtdb.firebaseio.com/orders.json',
       {
        method:'POST',
        body:JSON.stringify({
          user:userData,
          orderedItems:cartCtx.items
        })
       })
       
       setIsSubmitting(false);
       setdidSubmit(true)
       cartCtx.clearCart();
   }
  
  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item)=>(
        <CartItem key={item.id}
        name={item.name}
        amount={item.amount}
        price={item.price}
        onRemove={CartItemRemoveHandler.bind(null,item.id)}
        onAdd={cartItemAddHandler.bind(null,item)}
        />
        
       ))}
    </ul>
  );

  const modalActions= <div className={classes.actions}>
  <button className={classes['button--alt']} onClick={props.onClose}>
    Close
  </button>
  {hasItem && <button className={classes.button} onClick={orderHandler}>
    Order</button>}
</div>

const cartModalContent=(
<React.Fragment>
{cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose}/>}
      {!isCheckout && modalActions}
</React.Fragment>
)

const isSubmittingModalContent = <p>Sending order data...</p>;

const didsubmitModalContent=<React.Fragment>
  <p>Successfully sent the order!</p>
  <div className={classes.actions}>
      <button className={classes.button} onClick={props.onClose}>
        Close
      </button>
    </div>
  </React.Fragment>

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit &&  cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didsubmitModalContent}
     </Modal>
  );
};

export default Cart;