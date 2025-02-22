// src/pages/AuthorsList.jsx
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';

const AuthorsList = () => {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAuthors = async () => {
      setLoading(true);
      try {
        // Use RandomUser.me API to simulate authors
        const response = await fetch('https://randomuser.me/api/?results=10');
        if (!response.ok) {
          throw new Error('Failed to fetch authors');
        }
        const data = await response.json();
        // data.results is an array of random users
        setAuthors(data.results);
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    };

    fetchAuthors();
  }, []);

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

  return (
    <Container className="my-4">
      <h2>Authors</h2>
      <Row>
        {authors.map((author, index) => (
          <Col key={index} md={4} className="mb-4">
            <Card>
              <Card.Img variant="top" src={author.picture.large} alt={`${author.name.first} ${author.name.last}`} />
              <Card.Body>
                <Card.Title>{`${author.name.first} ${author.name.last}`}</Card.Title>
                <Card.Text>{author.email}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AuthorsList;
