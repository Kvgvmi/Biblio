import React from 'react';
import CategoriesSidebar from '../components/CategoriesSidebar';
import BookList from '../components/Booklist/BookList';
import { Navbar } from 'react-bootstrap';;

const HomePage = () => {
  return (
    <div>
      <Navbar/>
      <CategoriesSidebar/>
      <BookList />
    </div>
  );
};

export default HomePage;