import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { removeItem } from '../../features/cart/cartSlice';
import './CustomerDashboard.css';

// React Icons for better UI
import { FaUser, FaShoppingCart, FaHeart, FaHistory, 
         FaSignOutAlt, FaBook, FaTimes, FaAngleDoubleRight,
         FaEdit, FaSave, FaTrash, FaHome, FaSearch } from 'react-icons/fa';

const CustomerDashboard = () => {
  const [active, setActive] = useState("profile");
  // UPDATED: sidebar is always visible on desktop by default
  const [sidebar, setSidebar] = useState(true);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Get cart items from Redux store
  const cartItems = useSelector(state => state.cart.items);
  
  // State for user data
  const [userDetails, setUserDetails] = useState(null);
  const [editedUserDetails, setEditedUserDetails] = useState(null);
  const [purchases, setPurchases] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user profile
        const profileResponse = await axios.get('/api/users/me', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setUserDetails(profileResponse.data);
        setEditedUserDetails(profileResponse.data);

        // Fetch purchases
        const purchasesResponse = await axios.get('/api/orders', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setPurchases(purchasesResponse.data);

        // Fetch transactions
        const transactionsResponse = await axios.get('/api/transactions', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setTransactions(transactionsResponse.data);

        // Fetch wishlist
        const wishlistResponse = await axios.get('/api/wishlists', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setWishlist(wishlistResponse.data);
      } catch (err) {
        console.error("Error fetching user data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
    
    // ADDED: Check if on mobile and set sidebar accordingly
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setSidebar(false);
      } else {
        setSidebar(true);
      }
    };
    
    // Set initial state based on screen size
    handleResize();
    
    // Add event listener for resize
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
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

  // Handle removing item from wishlist
  const handleRemoveFromWishlist = (itemId) => {
    axios.delete(`/api/wishlists/${itemId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(() => {
        setWishlist(wishlist.filter(item => item.id !== itemId));
      })
      .catch(error => {
        console.error('Error removing from wishlist:', error);
      });
  };

  // Handle removing item from cart
  const handleRemoveFromCart = (itemId) => {
    dispatch(removeItem(itemId));
  };

  // Handle saving edited profile
  const handleSaveProfile = async () => {
    try {
      await axios.put('/api/users/me', editedUserDetails, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setUserDetails(editedUserDetails);
      setEditMode(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  // Handle input change in edit mode
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUserDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // UPDATED: handleSidebarClick now only toggles on mobile
  const handleSidebarClick = (newActive) => {
    setActive(newActive);
    // Only close sidebar on mobile
    if (window.innerWidth <= 768) {
      setSidebar(false);
    }
    // Otherwise keep sidebar open
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="customer-dashboard-container">
      {/* Persistent Top Navbar */}
      <div className="top-navbar">
        <div className="navbar-brand">
          <FaBook size={30} />
          <h1>LibraryHub</h1>
        </div>
        <div className="navbar-search">
          <div className="search-container">
            <input type="text" placeholder="Search books..." />
            <button className="search-button">
              <FaSearch />
            </button>
          </div>
        </div>
        <div className="navbar-actions">
          <button className="navbar-action-button" onClick={() => navigate('/')}>
            <FaHome />
            <span>Home</span>
          </button>
          <button className="navbar-action-button" onClick={() => setActive("cart")}>
            <FaShoppingCart />
            <span>Cart ({cartItems.length})</span>
          </button>
          <button className="navbar-action-button" onClick={handleLogout}>
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </div>

      <div className="dashboard">
        <div className="dashboard-card">
          <div className="sidebar-toggler" onClick={() => setSidebar(!sidebar)}>
            <button className="toggle-btn">
              {sidebar ? (
                <FaTimes size={25} color="#4a4a4a" />
              ) : (
                <FaAngleDoubleRight size={25} color="#4a4a4a" />
              )}
            </button>
          </div>
          
          {/* Sidebar Navigation */}
          <div className={sidebar ? "dashboard-options active" : "dashboard-options"}>
            <div className="dashboard-logo">
              <FaBook size={50} />
              <p className="logo-name">LibraryHub</p>
            </div>
            
            <a
              href="#profile"
              className={`dashboard-option ${active === "profile" ? "clicked" : ""}`}
              onClick={() => handleSidebarClick("profile")}
            >
              <FaUser className="dashboard-option-icon" /> Profile
            </a>
            
            <a
              href="#purchases"
              className={`dashboard-option ${active === "purchases" ? "clicked" : ""}`}
              onClick={() => handleSidebarClick("purchases")}
            >
              <FaHistory className="dashboard-option-icon" /> Purchases
            </a>
            
            <a
              href="#cart"
              className={`dashboard-option ${active === "cart" ? "clicked" : ""}`}
              onClick={() => handleSidebarClick("cart")}
            >
              <FaShoppingCart className="dashboard-option-icon" /> Cart
            </a>
            
            <a
              href="#wishlist"
              className={`dashboard-option ${active === "wishlist" ? "clicked" : ""}`}
              onClick={() => handleSidebarClick("wishlist")}
            >
              <FaHeart className="dashboard-option-icon" /> Wishlist
            </a>
            
            <a
              href="#transactions"
              className={`dashboard-option ${active === "transactions" ? "clicked" : ""}`}
              onClick={() => handleSidebarClick("transactions")}
            >
              <FaHistory className="dashboard-option-icon" /> Transactions
            </a>
            
            <a
              href="#"
              className="dashboard-option"
              onClick={() => {
                handleLogout();
                if (window.innerWidth <= 768) {
                  setSidebar(false);
                }
              }}
            >
              <FaSignOutAlt className="dashboard-option-icon" /> Log out
            </a>
          </div>

          {/* Dashboard Content */}
          <div className="dashboard-option-content">
            {/* Profile Section */}
            <div className={`dashboard-content-section ${active === "profile" ? "active" : ""}`} id="profile">
              <div className="section-header">
                <h2 className="section-heading">User Profile</h2>
                {!editMode ? (
                  <button className="edit-button" onClick={() => setEditMode(true)}>
                    <FaEdit /> Edit Profile
                  </button>
                ) : (
                  <button className="save-button" onClick={handleSaveProfile}>
                    <FaSave /> Save Changes
                  </button>
                )}
              </div>
              
              <div className="user-details-topbar">
                <div className="user-profile-image">
                  <FaUser size={100} color="#4a4a4a" />
                </div>
                <div className="user-info">
                  {!editMode ? (
                    <>
                      <p className="user-name">{userDetails?.name}</p>
                      <p className="user-email">{userDetails?.email}</p>
                      <p className="user-phone">{userDetails?.tele}</p>
                    </>
                  ) : (
                    <>
                      <input 
                        type="text" 
                        name="name" 
                        className="edit-input" 
                        value={editedUserDetails?.name || ''} 
                        onChange={handleInputChange} 
                        placeholder="Your Name"
                      />
                      <input 
                        type="email" 
                        name="email" 
                        className="edit-input" 
                        value={editedUserDetails?.email || ''} 
                        onChange={handleInputChange} 
                        placeholder="Your Email"
                      />
                      <input 
                        type="tel" 
                        name="tele" 
                        className="edit-input" 
                        value={editedUserDetails?.tele || ''} 
                        onChange={handleInputChange} 
                        placeholder="Your Phone"
                      />
                    </>
                  )}
                </div>
              </div>
              <div className="user-details-specific">
                <div className="user-address">
                  <h3>Address</h3>
                  {!editMode ? (
                    <p>{userDetails?.address || "Not provided"}</p>
                  ) : (
                    <textarea 
                      name="address" 
                      className="edit-input edit-textarea" 
                      value={editedUserDetails?.address || ''} 
                      onChange={handleInputChange}
                      placeholder="Enter your address"
                    ></textarea>
                  )}
                </div>
                <div className="user-stats">
                  <div className="stats-item">
                    <h3>Purchases</h3>
                    <p className="stats-value">{purchases.length}</p>
                  </div>
                  <div className="stats-item">
                    <h3>Wishlist</h3>
                    <p className="stats-value">{wishlist.length}</p>
                  </div>
                  <div className="stats-item">
                    <h3>Cart</h3>
                    <p className="stats-value">{cartItems.length}</p>
                  </div>
                </div>
              </div>
              {editMode && (
                <button className="cancel-button" onClick={() => {
                  setEditMode(false);
                  setEditedUserDetails(userDetails);
                }}>
                  Cancel
                </button>
              )}
            </div>

            {/* Purchases Section */}
            <div className={`dashboard-content-section ${active === "purchases" ? "active" : ""}`} id="purchases">
              <h2 className="section-heading">Your Purchases</h2>
              {purchases.length > 0 ? (
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Book Name</th>
                      <th>Purchase Date</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {purchases.map((purchase, index) => (
                      <tr key={purchase.id}>
                        <td>{index + 1}</td>
                        <td>{purchase.book_name}</td>
                        <td>{new Date(purchase.purchase_date).toLocaleDateString()}</td>
                        <td>${purchase.price || '0.00'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="empty-message">
                  <p>You haven't made any purchases yet.</p>
                  <button className="browse-button" onClick={() => navigate('/')}>Browse Books</button>
                </div>
              )}
            </div>

            {/* Cart Section */}
            <div className={`dashboard-content-section ${active === "cart" ? "active" : ""}`} id="cart">
              <h2 className="section-heading">Your Cart</h2>
              {cartItems.length > 0 ? (
                <>
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>S.No</th>
                        <th>Book Name</th>
                        <th>Price</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((item, index) => (
                        <tr key={item.id}>
                          <td>{index + 1}</td>
                          <td>{item.book_name || item.title}</td>
                          <td>${item.price}</td>
                          <td>
                            <button 
                              className="action-button remove" 
                              onClick={() => handleRemoveFromCart(item.id)}
                            >
                              <FaTrash /> Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="cart-total">
                    <p>Total: ${cartItems.reduce((total, item) => total + item.price, 0).toFixed(2)}</p>
                    <button className="checkout-button">Proceed to Checkout</button>
                  </div>
                </>
              ) : (
                <div className="empty-message">
                  <p>Your cart is empty.</p>
                  <button className="browse-button" onClick={() => navigate('/')}>Browse Books</button>
                </div>
              )}
            </div>

            {/* Wishlist Section */}
            <div className={`dashboard-content-section ${active === "wishlist" ? "active" : ""}`} id="wishlist">
              <h2 className="section-heading">Your Wishlist</h2>
              {wishlist.length > 0 ? (
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Book Name</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {wishlist.map((item, index) => (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.book_name}</td>
                        <td>
                          <div className="action-buttons">
                            <button 
                              className="action-button cart"
                              onClick={() => {
                                // Logic to add to cart
                                console.log("Adding to cart:", item);
                              }}
                            >
                              <FaShoppingCart /> Add to Cart
                            </button>
                            <button 
                              className="action-button remove" 
                              onClick={() => handleRemoveFromWishlist(item.id)}
                            >
                              <FaTrash /> Remove
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="empty-message">
                  <p>Your wishlist is empty.</p>
                  <button className="browse-button" onClick={() => navigate('/')}>Browse Books</button>
                </div>
              )}
            </div>

            {/* Transactions Section */}
            <div className={`dashboard-content-section ${active === "transactions" ? "active" : ""}`} id="transactions">
              <h2 className="section-heading">Your Transactions</h2>
              {transactions.length > 0 ? (
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Amount</th>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((transaction, index) => (
                      <tr key={transaction.id}>
                        <td>{index + 1}</td>
                        <td>${transaction.amount}</td>
                        <td>{new Date(transaction.date).toLocaleDateString()}</td>
                        <td className={`status ${transaction.status?.toLowerCase() || 'completed'}`}>
                          {transaction.status || 'Completed'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="empty-message">
                  <p>No transactions found.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;