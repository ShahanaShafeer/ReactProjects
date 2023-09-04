import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { FaRupeeSign } from 'react-icons/fa';
import { AiFillStar } from 'react-icons/ai';
import { MdAdd, MdRemove, MdDelete } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CartPage = ({ cartItems, setBadgeCount }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
   
    const initialCart = cartItems.map((item) => ({
      ...item,
      quantity: 1,
    }));
    setCart(initialCart);
  }, [cartItems]);

  const handleIncrement = (itemId) => {
    const updatedCart = cart.map((item) => {
      if (item.id === itemId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const handleDecrement = (itemId) => {
    const updatedCart = cart.map((item) => {
      if (item.id === itemId && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const handleDelete = (itemId) => {
    const deletedItem = cart.find((item) => item.id === itemId);
    const updatedCart = cart.filter((item) => item.id !== itemId);
    setCart(updatedCart);
    toast.error(`${deletedItem.title} removed from cart`);
    const newBadgeCount = updatedCart.reduce((count, item) => count + item.quantity, 0);
    setBadgeCount(newBadgeCount);
  };

  
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div>
      <div className='CartCardWrapper'>
        {cart.map((item) => (
          <div key={item.id}>
            <Card className='CartCard'>
              <div className='imageWrapper'>
                <Card.Img variant='top' src={item.images[0]} className='CartCardImg' />
              </div>
              <Card.Body className='CartCardBody'>
                <Card.Title style={{ fontSize: "larger", fontWeight: "700" }}>{item.title}</Card.Title>
                <div>
                  <h4 style={{ color: "#00d900" }}>{item.discountPercentage}%</h4>
                  <br />
                  {item.rating}
                  <AiFillStar style={{ color: 'rgb(239, 161, 4)' }} />
                </div>
              </Card.Body>
              <div className='CartCardBody'>
                <h3>
                  <FaRupeeSign style={{ fontSize: '11px' }} />
                  {item.price * item.quantity}
                </h3>
              </div>
              <div className='CartCardBody'>
                <MdRemove
                  style={{ cursor: 'pointer', marginRight: '5px', border: '1px solid black', fontSize: "20px" }}
                  onClick={() => handleDecrement(item.id)}
                />
                <span>{item.quantity}</span>
                <MdAdd
                  style={{ cursor: 'pointer', marginLeft: '5px', border: '1px solid black', fontSize: "20px" }}
                  onClick={() => handleIncrement(item.id)}
                />
              </div>
              <div className='CartCardBody'>
                <MdDelete
                  style={{ cursor: 'pointer', fontSize: '30px', color: 'red' }}
                  onClick={() => handleDelete(item.id)}
                />
              </div>
            </Card>
          </div>
        ))}
      </div>
      <div className="TotalPrice">
        <h3>Total Price: <FaRupeeSign style={{ fontSize: '11px' }} />{totalPrice}</h3>
      </div>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} />
    </div>
  );
};

export default CartPage;
