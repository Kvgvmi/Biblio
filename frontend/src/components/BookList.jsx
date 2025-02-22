import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, Button, Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooksToSell } from '../features/book_to_sell/book_to_sellSlice'; // Adjust path as necessary

const BookList = () => {
  const dispatch = useDispatch();
  const { books, loading, error } = useSelector((state) => state.book_to_sell);
  const location = useLocation();
  

  // Extract query parameters from the URL
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get('category');
  const searchQuery = queryParams.get('search');

  useEffect(() => {
    // Dispatch fetch action to get books
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

  // Filter books based on category or search query
  const filteredBooks = books.filter(book => {
    const matchesCategory = category ? book.category === category : true;
    const matchesSearch = searchQuery ? book.title.toLowerCase().includes(searchQuery.toLowerCase()) : true;
    return matchesCategory && matchesSearch;
  });

  return (
    <Container className="my-4">
      <Row>
        {filteredBooks.map(book => (
          <Col key={book.id} md={4} className="mb-4"> {/* Use book.id or another unique identifier */}
            <Card>
              <Card.Img variant="top" src={book.image} alt={book.title} />
              <Card.Body>
                <Card.Title>{book.title}</Card.Title>
                <Card.Text>{book.description}</Card.Text> {/* Adjust this if necessary */}
                <Button variant="primary">View Details</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default BookList;