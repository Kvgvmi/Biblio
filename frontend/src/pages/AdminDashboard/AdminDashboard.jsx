import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import EditBook from "./EditBook";

import './AdminDashboard.css';

const AdminDashboard = () => {
  const [isEditOpen, setIsEditOpen] = useState(false); // State to control modal visibility
  const [selectedBook, setSelectedBook] = useState(null); // State to store the selected book for editing
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);
  const [rentals, setRentals] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(true);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchData();
  }, [token, navigate]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [usersRes, booksRes, rentalsRes] = await Promise.all([
        axios.get("http://localhost:8000/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:8000/api/book-to-rent", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:8000/api/rentals", {
          headers: { Authorization: `Bearer ${token}` },
        })
      ]);
      
      setUsers(usersRes.data);
      setBooks(booksRes.data);
      setRentals(rentalsRes.data);
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setIsLoading(false);
    }
  };

  const openEditModal = (book) => {
    setSelectedBook(book); // Set the selected book for editing
    setIsEditOpen(true); // Open the modal
  };

  const closeEditModal = () => {
    setIsEditOpen(false); // Close the modal
    setSelectedBook(null); // Clear the selected book
  };


  const handleDeleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/book-to-rent/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Book deleted successfully!');
      fetchData(); // Refetch data after deletion
    } catch (error) {
      console.error('Failed to delete book:', error.message);
      alert('Failed to delete book. Please try again.');
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading dashboard data...</div>;
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "books":
        return (
          <div className="w-full mb-6 rounded-lg shadow-lg">
            <div className="rounded-t mb-0 px-4 py-3 border-0 bg-white">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-lg text-gray-700">Manage Books</h3>
                </div>
                <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                  <Link to="/dashboard/add-book" className="bg-indigo-600 text-white active:bg-indigo-700 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                    Add New Book
                  </Link>
                </div>
              </div>
            </div>

            <div className="block w-full overflow-x-auto bg-white">
              <table className="items-center w-full bg-transparent border-collapse">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-xs font-semibold text-left uppercase border-b">#</th>
                    <th className="px-6 py-3 text-xs font-semibold text-left uppercase border-b">Title</th>
                    <th className="px-6 py-3 text-xs font-semibold text-left uppercase border-b">Author</th>
                    <th className="px-6 py-3 text-xs font-semibold text-left uppercase border-b">Category</th>
                    <th className="px-6 py-3 text-xs font-semibold text-left uppercase border-b">Price</th>
                    <th className="px-6 py-3 text-xs font-semibold text-left uppercase border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {books.map((book, index) => (
                    <tr key={book.id} className="border-b">
                      <td className="px-6 py-4 text-sm">{index + 1}</td>
                      <td className="px-6 py-4 text-sm">{book.title}</td>
                      <td className="px-6 py-4 text-sm">{book.author}</td>
                      <td className="px-6 py-4 text-sm">{book.category || 'N/A'}</td>
                      <td className="px-6 py-4 text-sm">${book.price || book.rental_price || 'N/A'}</td>
                      <td className="px-6 py-4 text-sm space-x-2">
                        <Link 
                          to={`/dashboard/edit-book/${book.id}`} 
                          className="text-indigo-600 hover:text-indigo-900 mr-2"
                        >
                          Edit
                        </Link>
                        <button 
                          onClick={() => handleDeleteBook(book.id)}
                          className="text-white bg-red-500 hover:bg-red-600 py-1 px-3 rounded-full text-xs"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      
      case "users":
        return (
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b">
              <h3 className="font-semibold text-lg">Manage Users</h3>
            </div>
            <div className="p-4">
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 border-b text-xs font-medium text-gray-500 uppercase text-left">ID</th>
                      <th className="px-6 py-3 border-b text-xs font-medium text-gray-500 uppercase text-left">Name</th>
                      <th className="px-6 py-3 border-b text-xs font-medium text-gray-500 uppercase text-left">Email</th>
                      <th className="px-6 py-3 border-b text-xs font-medium text-gray-500 uppercase text-left">Role</th>
                      <th className="px-6 py-3 border-b text-xs font-medium text-gray-500 uppercase text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm">{user.id}</td>
                        <td className="px-6 py-4 text-sm">{user.name}</td>
                        <td className="px-6 py-4 text-sm">{user.email}</td>
                        <td className="px-6 py-4 text-sm">{user.role || 'User'}</td>
                        <td className="px-6 py-4 text-sm">
                          <button className="bg-indigo-500 text-white px-3 py-1 rounded text-xs mr-2">Edit</button>
                          <button className="bg-red-500 text-white px-3 py-1 rounded text-xs">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      
      case "rentals":
        return (
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b">
              <h3 className="font-semibold text-lg">Manage Rentals</h3>
            </div>
            <div className="p-4">
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 border-b text-xs font-medium text-gray-500 uppercase text-left">ID</th>
                      <th className="px-6 py-3 border-b text-xs font-medium text-gray-500 uppercase text-left">User</th>
                      <th className="px-6 py-3 border-b text-xs font-medium text-gray-500 uppercase text-left">Book</th>
                      <th className="px-6 py-3 border-b text-xs font-medium text-gray-500 uppercase text-left">Rental Date</th>
                      <th className="px-6 py-3 border-b text-xs font-medium text-gray-500 uppercase text-left">Due Date</th>
                      <th className="px-6 py-3 border-b text-xs font-medium text-gray-500 uppercase text-left">Status</th>
                      <th className="px-6 py-3 border-b text-xs font-medium text-gray-500 uppercase text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rentals.map((rental) => (
                      <tr key={rental.id} className="border-b hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm">{rental.id}</td>
                        <td className="px-6 py-4 text-sm">{rental.user_id}</td>
                        <td className="px-6 py-4 text-sm">{rental.book_id}</td>
                        <td className="px-6 py-4 text-sm">{rental.rental_date || 'N/A'}</td>
                        <td className="px-6 py-4 text-sm">{rental.due_date || 'N/A'}</td>
                        <td className="px-6 py-4 text-sm">
                          <span className={`px-2 py-1 rounded text-xs ${
                            rental.status === 'active' ? 'bg-green-100 text-green-800' : 
                            rental.status === 'overdue' ? 'bg-red-100 text-red-800' : 
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {rental.status || 'Active'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <button className="bg-indigo-500 text-white px-3 py-1 rounded text-xs mr-2">View</button>
                          <button className="bg-red-500 text-white px-3 py-1 rounded text-xs">Cancel</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      
      default: // Overview
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-lg font-medium text-gray-700 mb-2">Total Users</div>
                <p className="text-3xl font-bold">{users.length}</p>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-lg font-medium text-gray-700 mb-2">Total Books</div>
                <p className="text-3xl font-bold">{books.length}</p>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-lg font-medium text-gray-700 mb-2">Active Rentals</div>
                <p className="text-3xl font-bold">{rentals.length}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 border-b">
                  <h3 className="font-semibold text-lg">Recent Users</h3>
                </div>
                <div className="p-4">
                  <table className="min-w-full">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                        <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.slice(0, 5).map((user) => (
                        <tr key={user.id} className="border-b">
                          <td className="px-6 py-4 text-sm">{user.name}</td>
                          <td className="px-6 py-4 text-sm">{user.email}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <button 
                    className="w-full mt-4 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded"
                    onClick={() => setActiveTab("users")}
                  >
                    View All Users
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 border-b">
                  <h3 className="font-semibold text-lg">Recent Books</h3>
                </div>
                <div className="p-4">
                  <table className="min-w-full">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                        <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase">Author</th>
                      </tr>
                    </thead>
                    <tbody>
                      {books.slice(0, 5).map((book) => (
                        <tr key={book.id} className="border-b">
                          <td className="px-6 py-4 text-sm">{book.title}</td>
                          <td className="px-6 py-4 text-sm">{book.author}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <button 
                    className="w-full mt-4 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded"
                    onClick={() => setActiveTab("books")}
                  >
                    View All Books
                  </button>
                </div>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab("overview")}
              className={`mr-8 py-4 px-1 ${
                activeTab === "overview"
                  ? "border-b-2 border-indigo-500 text-indigo-600"
                  : "border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("books")}
              className={`mr-8 py-4 px-1 ${
                activeTab === "books"
                  ? "border-b-2 border-indigo-500 text-indigo-600"
                  : "border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Books
            </button>
            <button
              onClick={() => setActiveTab("users")}
              className={`mr-8 py-4 px-1 ${
                activeTab === "users"
                  ? "border-b-2 border-indigo-500 text-indigo-600"
                  : "border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Users
            </button>
            <button
              onClick={() => setActiveTab("rentals")}
              className={`mr-8 py-4 px-1 ${
                activeTab === "rentals"
                  ? "border-b-2 border-indigo-500 text-indigo-600"
                  : "border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Rentals
            </button>
          </nav>
        </div>
      </div>

      {renderTabContent()}
      {isEditOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
            <EditBook
              book={selectedBook} // Pass the selected book to EditBook
              onClose={closeEditModal} // Pass a function to close the modal
              onSave={() => {
                fetchData(); // Refetch data after saving
                closeEditModal(); // Close the modal
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;