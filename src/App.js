import React, { useEffect, useState } from 'react';
import { Badge, Button, Card, Container, Nav, Navbar } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import img from './Images/logo1.png';
import axios from 'axios';
import CartPage from './CartPage';
import { FaRupeeSign } from 'react-icons/fa';
import { AiFillStar } from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [Products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [badgeCount, setBadgeCount] = useState(0);

  const url = 'https://dummyjson.com/products';
  useEffect(() => {
    axios.get(url).then((res) => setProducts(res.data.products));
  }, []);

  return (
    <Router>
      <div>
        <Navbar className='fixed-top' style={{ background: "linear-gradient(90deg, rgb(213, 187, 189) 0%, rgb(212 108 119) 35%, rgb(176, 129, 134) 100%)" }}>
          <Container>
            <img className='navImage' src={img} alt='' />
            <Navbar.Brand className='navbarBrand'>Ecom App</Navbar.Brand>
            <Nav className='ms-auto fs-5'>
              <Link to={"/"} className="ProductsLink">Products</Link>
              <Link to='/cart' className='cartButton'>
                Cart<Badge bg='secondary'>{badgeCount}</Badge>
                <span className='visually-hidden badge'>unread messages</span>
              </Link>
            </Nav>
          </Container>
        </Navbar>

        <Routes>
          <Route path='/' element={<ProductCards Products={Products} setCartItems={setCartItems} setBadgeCount={setBadgeCount} />} />
          <Route path='/cart' element={<CartPage cartItems={cartItems} setBadgeCount={setBadgeCount} />} />
        </Routes>
      </div>
    </Router>
  );
};

const ProductCards = ({ Products, setCartItems, setBadgeCount }) => (
  <div className='cardsWrapper'>
    {Products.map((item) => (
      <div className='cardsContainer' key={item.id}>
        <Card className='cards'>
          <div className='imageWrapper'>
            <Card.Img variant='top' src={item.images[0]} className='cardImage' />
          </div>
          <Card.Title className='cardTitle'>{item.title}</Card.Title>
          <Card.Body>
            <div className="itemPriceRating"><FaRupeeSign style={{ fontSize: '11px' }} />{item.price}<br />
              {item.rating}<AiFillStar style={{ color: "rgb(239, 161, 4)" }} /></div>
            <div><button
              className='primaryButton'
              onClick={() => {
                setCartItems((prevCartItems) => [...prevCartItems, item]);
                setBadgeCount((prevBadgeCount) => prevBadgeCount + 1);
                toast.success(`${item.title} added to cart`);
              }}
            >
              Add to Cart
            </button></div>
          </Card.Body>
        </Card>

      </div>
    ))}
     <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} />
  </div>
);

export default App;
