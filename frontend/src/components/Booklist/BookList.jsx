import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, Container, Spinner, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooksToSell } from '../../features/book_to_sell/book_to_sellSlice';
import './BookList.css';

const BookList = () => {
  const dispatch = useDispatch();
  const { books, loading, error } = useSelector((state) => state.book_to_sell);
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get('category');
  const searchQuery = queryParams.get('search');

  useEffect(() => {
    dispatch(fetchBooksToSell());
  }, [dispatch]);

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
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  const filteredBooks = books.filter(book => {
    const matchesCategory = category ? book.category_id == category : true;
    const matchesSearch = searchQuery ? book.title.toLowerCase().includes(searchQuery.toLowerCase()) : true;
    return matchesCategory && matchesSearch;
  });

  return (
    <Container className="book-list-container">
      <div className="scrollable-book-list">
        {filteredBooks.map(book => {
          const price = typeof book.price === 'string' ? parseFloat(book.price) : book.price;
          const imageUrl = book.image ? `http://127.0.0.1:8000/storage/BookImages/${book.image}` : 'https://via.placeholder.com/150';

          console.log(`Book ID: ${book.id}, Image URL: ${imageUrl}`); // Debugging

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
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </Container>
  );
};

export default BookList;