import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Card, Button, Spinner } from 'react-bootstrap';
import { FaUser, FaCartPlus, FaHeart, FaSignOutAlt } from 'react-icons/fa';
import axios from 'axios';
import './CustomerDashboard.css'; // Import the CSS file

const CustomerDashboard = () => {
  const [purchases, setPurchases] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user profile
    axios.get('/api/users/me', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response => {
        setProfile(response.data);
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
      });

    // Fetch purchases (assuming purchases are stored in orders)
    axios.get('/api/orders', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response => {
        setPurchases(response.data);
      })
      .catch(error => {
        console.error('Error fetching purchases:', error);
      });

    // Fetch transactions
    axios.get('/api/transactions', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response => {
        setTransactions(response.data);
      })
      .catch(error => {
        console.error('Error fetching transactions:', error);
      });

    // Fetch wishlist
    axios.get('/api/wishlists', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response => {
        setWishlist(response.data);
      })
      .catch(error => {
        console.error('Error fetching wishlist:', error);
      });

    // Fetch cart
    axios.get('/api/carts', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response => {
        setCart(response.data);
      })
      .catch(error => {
        console.error('Error fetching cart:', error);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = () => {
    axios.post('/api/logout', {}, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(() => {
        localStorage.removeItem('token');
        navigate('/login');
      })
      .catch(error => {
        console.error('Error logging out:', error);
      });
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <>
      {/* Navbar with Background Image */}
      <Navbar bg="light" expand="lg" className="navbar-custom">
        <Navbar.Brand href="/">Bookstore</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link onClick={() => navigate('/profile')}>
              <FaUser /> Profile
            </Nav.Link>
            <Nav.Link onClick={() => navigate('/cart')}>
              <FaCartPlus /> Cart
            </Nav.Link>
            <Nav.Link onClick={() => navigate('/wishlist')}>
              <FaHeart /> Wishlist
            </Nav.Link>
            <Nav.Link onClick={handleLogout}>
              <FaSignOutAlt /> Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Dashboard Content */}
      <Container className="dashboard-container">
        <h2>Welcome, {profile.name}!</h2>

        {/* Profile Section */}
        <div className="section">
          <h3>Your Profile</h3>
          <Card>
            <Card.Body>
              <Card.Text><strong>Name:</strong> {profile.name}</Card.Text>
              <Card.Text><strong>Email:</strong> {profile.email}</Card.Text>
              <Card.Text><strong>Address:</strong> {profile.address}</Card.Text>
              <Card.Text><strong>Phone:</strong> {profile.tele}</Card.Text>
            </Card.Body>
          </Card>
        </div>

        {/* Purchases Section */}
        <div className="section">
          <h3>Your Purchases</h3>
          {purchases.length > 0 ? (
            <div className="list">
              {purchases.map(purchase => (
                <Card key={purchase.id} className="list-item">
                  <Card.Body>
                    <Card.Title>{purchase.book_name}</Card.Title>
                    <Card.Text>Purchased on: {new Date(purchase.purchase_date).toLocaleDateString()}</Card.Text>
                  </Card.Body>
                </Card>
              ))}
            </div>
          ) : (
            <p>No purchases found.</p>
          )}
        </div>

        {/* Transactions Section */}
        <div className="section">
          <h3>Your Transactions</h3>
          {transactions.length > 0 ? (
            <div className="list">
              {transactions.map(transaction => (
                <Card key={transaction.id} className="list-item">
                  <Card.Body>
                    <Card.Title>Amount: ${transaction.amount}</Card.Title>
                    <Card.Text>Date: {new Date(transaction.date).toLocaleDateString()}</Card.Text>
                  </Card.Body>
                </Card>
              ))}
            </div>
          ) : (
            <p>No transactions found.</p>
          )}
        </div>

        {/* Wishlist Section */}
        <div className="section">
          <h3>Your Wishlist</h3>
          {wishlist.length > 0 ? (
            <div className="list">
              {wishlist.map(item => (
                <Card key={item.id} className="list-item">
                  <Card.Body>
                    <Card.Title>{item.book_name}</Card.Title>
                    <Button variant="danger" onClick={() => {
                      axios.delete(`/api/wishlists/${item.id}`, {
                        headers: {
                          'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                      })
                        .then(() => {
                          setWishlist(wishlist.filter(wish => wish.id !== item.id));
                        });
                    }}>
                      Remove
                    </Button>
                  </Card.Body>
                </Card>
              ))}
            </div>
          ) : (
            <p>Your wishlist is empty.</p>
          )}
        </div>

        {/* Cart Section */}
        <div className="section">
          <h3>Your Cart</h3>
          {cart.length > 0 ? (
            <div className="list">
              {cart.map(item => (
                <Card key={item.id} className="list-item">
                  <Card.Body>
                    <Card.Title>{item.book_name}</Card.Title>
                    <Card.Text>Price: ${item.price}</Card.Text>
                    <Button variant="danger" onClick={() => {
                      axios.delete(`/api/carts/${item.id}`, {
                        headers: {
                          'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                      })
                        .then(() => {
                          setCart(cart.filter(cartItem => cartItem.id !== item.id));
                        });
                    }}>
                      Remove
                    </Button>
                  </Card.Body>
                </Card>
              ))}
            </div>
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>
      </Container>
    </>
  );
};

export default CustomerDashboard;