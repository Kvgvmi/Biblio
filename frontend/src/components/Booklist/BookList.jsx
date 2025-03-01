import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, Container, Spinner, Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooksToSell } from '../../features/book_to_sell/book_to_sellSlice';
import { addToCart, addToWishlist } from '../../features/users/userSlice';
import { FaArrowLeft, FaArrowRight, FaCartPlus, FaHeart } from 'react-icons/fa';
import './BookList.css'; // Ensure you have this CSS file for custom styles

const BookList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { books, loading, error } = useSelector((state) => state.book_to_sell);
  const { isAuthenticated } = useSelector((state) => state.users); // Access state.users
  const location = useLocation();

  const [showLoginModal, setShowLoginModal] = useState(false); // For styled login/signup popup
  const [scrollPosition, setScrollPosition] = useState(0); // For horizontal scroll

  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get('category');
  const searchQuery = queryParams.get('search');

  useEffect(() => {
    dispatch(fetchBooksToSell());
  }, [dispatch]);

  // Filter books based on category and search query
  const filteredBooks = books.filter(book => {
    const matchesCategory = category ? book.category_id == category : true;
    const matchesSearch = searchQuery ? book.title.toLowerCase().includes(searchQuery.toLowerCase()) : true;
    return matchesCategory && matchesSearch;
  });

  // Handle scroll left
  const scrollLeft = () => {
    const container = document.querySelector('.scrollable-book-list');
    container.scrollBy({ left: -300, behavior: 'smooth' });
  };

  // Handle scroll right
  const scrollRight = () => {
    const container = document.querySelector('.scrollable-book-list');
    container.scrollBy({ left: 300, behavior: 'smooth' });
  };

  // Handle "Add to Cart" button click
  const handleAddToCart = (bookId) => {
    if (!isAuthenticated) {
      setShowLoginModal(true); // Show styled login/signup popup
    } else {
      dispatch(addToCart(bookId)); // Add to cart
    }
  };

  // Handle "Add to Wishlist" button click
  const handleAddToWishlist = (bookId) => {
    if (!isAuthenticated) {
      setShowLoginModal(true); // Show styled login/signup popup
    } else {
      dispatch(addToWishlist(bookId)); // Add to wishlist
    }
  };

  if (loading) {
    return (
      <Container className="my-4 text-center">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-4">
        <div className="alert alert-danger">{error}</div>
      </Container>
    );
  }

  return (
    <Container className="book-list-container">
      {/* Navigation Arrows at the Top */}
      <div className="navigation-arrows">
        <Button variant="light" onClick={scrollLeft}><FaArrowLeft /></Button>
        <Button variant="light" onClick={scrollRight}><FaArrowRight /></Button>
      </div>

      {/* Book List */}
      <div className="scrollable-book-list">
        {filteredBooks.map(book => {
          const price = typeof book.price === 'string' ? parseFloat(book.price) : book.price;
          const imageUrl = book.image ? `http://127.0.0.1:8000/storage/BookImages/${book.image}` : 'https://via.placeholder.com/150';

          return (
            <Card key={book.id} className="book-card">
              <Card.Img
                variant="top"
                src={imageUrl}
                alt={book.title}
                className="book-image"
                onError={(e) => {
                  console.error(`Failed to load image: ${e.target.src}`);
                  e.target.src = 'https://via.placeholder.com/150'; // Fallback image
                }}
              />
              <Card.Body>
                <Card.Title className="book-title">{book.title}</Card.Title>
                <Card.Text className="book-price">${price.toFixed(2)}</Card.Text>
                <Card.Text className="book-description">{book.description}</Card.Text>
                <div className="book-actions">
                  <Button variant="primary" onClick={() => handleAddToCart(book.id)}>
                    <FaCartPlus /> Add to Cart
                  </Button>
                  <Button variant="danger" onClick={() => handleAddToWishlist(book.id)}>
                    <FaHeart /> Add to Wishlist
                  </Button>
                </div>
              </Card.Body>
            </Card>
          );
        })}
      </div>

      {/* Styled Login/Signup Modal */}
      <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)} centered>
        <Modal.Header closeButton className="modal-header-custom">
          <Modal.Title>Login Required</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body-custom">
          <p>You need to log in to add items to your cart or wishlist.</p>
        </Modal.Body>
        <Modal.Footer className="modal-footer-custom">
          <Button variant="secondary" onClick={() => navigate('/login')}>
            Login
          </Button>
          <Button variant="primary" onClick={() => navigate('/signup')}>
            Sign Up
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default BookList;