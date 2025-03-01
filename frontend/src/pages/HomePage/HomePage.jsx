import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Navbar from '../../components/Navbar/Navbar'; // Import your Navbar component
import './HomePage.css'; // Import the CSS file

const HomePage = () => {
  return (
    <div>
      {/* Use the Navbar component */}
      <Navbar />

      {/* Hero Section with Background Image and Quote */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Our Library</h1>
          <p className="quote">
            "A room without books is like a body without a soul." – Cicero
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section id="our-story" className="story-section"> {/* Added id */}
        <Container>
              <h2>Our Story</h2>
              <p>
                Our library was founded in 2023 with the mission to provide a space for book lovers to explore, learn, and grow. 
                We believe in the power of books to transform lives and inspire creativity. Over the years, we have built a 
                collection of over 10,000 books, ranging from classic literature to modern bestsellers.
                Our library is more than just a place to read; it's a community hub where people come together to share ideas, 
                attend workshops, and participate in book clubs. We are proud to be a part of this vibrant community and look 
                forward to welcoming you.
              </p>
              <div className="story-images">                
                <img src="/images/a.jpeg" alt="Library Bookshelf" className="img-fluid mt-3" />
                <img src="/images/e.jpeg" alt="Library Interior" className="img-fluid" />
              </div>
        </Container>
      </section>

      {/* Footer */}
      <footer id="footer" className="footer"> {/* Added id */}
        <Container>
          <Row>
            <Col md={4}>
              <h3>Contact Us</h3>
              <p>Email: info@ourlibrary.com</p>
              <p>Phone: +123 456 7890</p>
            </Col>
            <Col md={4}>
              <h3>Address</h3>
              <p>123 Book Street, Knowledge City, World</p>
            </Col>
            <Col md={4}>
              <h3>Follow Us</h3>
              <p>Facebook | Twitter | Instagram</p>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
};

export default HomePage;