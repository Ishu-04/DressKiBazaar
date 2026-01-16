import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import './Address.css';

const Address = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [address, setAddress] = useState({
    line1: '',
    line2: '',
    city: '',
    state: '',
    pin: '',
  });

  const [savedAddresses, setSavedAddresses] = useState(() => {
    const stored = localStorage.getItem('savedAddresses');
    return stored ? JSON.parse(stored) : [];
  });

  const [activeSection, setActiveSection] = useState('personal');

  // Personal Info Handlers
  const handlePersonalChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Address Handlers
  const handleAddressChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  // Save Personal Info
  const handlePersonalSave = (e) => {
    e.preventDefault();
    alert('Personal information saved!');
  };

  // Save Address
  const handleAddressSave = (e) => {
    e.preventDefault();
    const newAddress = { ...address };
    const updatedAddresses = [...savedAddresses, newAddress];
    setSavedAddresses(updatedAddresses);
    localStorage.setItem('savedAddresses', JSON.stringify(updatedAddresses));
    setAddress({
      line1: '',
      line2: '',
      city: '',
      state: '',
      pin: '',
    });
  };

  // Remove Address
  const handleRemoveAddress = (idx) => {
    const updatedAddresses = savedAddresses.filter((_, i) => i !== idx);
    setSavedAddresses(updatedAddresses);
    localStorage.setItem('savedAddresses', JSON.stringify(updatedAddresses));
  };

  return (
    <div className="address-page">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="profile-header">
          <FaUserCircle className="profile-header-icon" />
          <div className="profile-header-text">Hi, {user.name || "User"}</div>
        </div>
        <div
          className={`sidebar-option ${activeSection === 'personal' ? 'active' : ''}`}
          onClick={() => setActiveSection('personal')}
        >
          Personal Information
        </div>
        <div
          className={`sidebar-option ${activeSection === 'address' ? 'active' : ''}`}
          onClick={() => setActiveSection('address')}
        >
          Manage Addresses
        </div>
      </div>

      {/* Main Content */}
      <div className="address-content">
        {activeSection === 'personal' ? (
          <>
            <h2>Personal Information</h2>
            <form className="address-form" onSubmit={handlePersonalSave}>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handlePersonalChange}
                placeholder="Enter your name"
                required
              />
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handlePersonalChange}
                placeholder="Enter your email"
                required
              />
              <label>Phone:</label>
              <input
                type="text"
                name="phone"
                value={user.phone}
                onChange={handlePersonalChange}
                placeholder="Enter your phone number"
                required
              />
              <button type="submit">Save</button>
            </form>
          </>
        ) : (
          <>
            <h2>Manage Addresses</h2>
            <form className="address-form" onSubmit={handleAddressSave}>
              <label>Address Line 1:</label>
              <input
                type="text"
                name="line1"
                value={address.line1}
                onChange={handleAddressChange}
                placeholder="Flat, House no., Building, Company, Apartment"
                required
              />
              <label>Address Line 2:</label>
              <input
                type="text"
                name="line2"
                value={address.line2}
                onChange={handleAddressChange}
                placeholder="Area, Street, Sector, Village"
              />
              <label>City:</label>
              <input
                type="text"
                name="city"
                value={address.city}
                onChange={handleAddressChange}
                placeholder="Enter your city"
                required
              />
              <label>State:</label>
              <input
                type="text"
                name="state"
                value={address.state}
                onChange={handleAddressChange}
                placeholder="Enter your state"
                required
              />
              <label>PIN Code:</label>
              <input
                type="text"
                name="zip"
                value={address.zip}
                onChange={handleAddressChange}
                placeholder="Enter your PIN code"
                required
              />
              <button type="submit">Save Address</button>
            </form>
            {/* Show saved addresses */}
            <div className="saved-addresses-list">
              <h3>Saved Addresses</h3>
              {savedAddresses.length === 0 && (
                <div className="empty-address-msg">No addresses saved yet.</div>
              )}
              <ul>
                {savedAddresses.map((addr, idx) => (
                  <li key={idx} className="saved-address-card">
                    <div>
                      <span>{addr.line1}</span>
                      {addr.line2 && <span>, {addr.line2}</span>}
                      <span>, {addr.city}, {addr.state} - {addr.zip}</span>
                    </div>
                    <button className="remove-address-btn" onClick={() => handleRemoveAddress(idx)}>Remove</button>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Address;