import React from 'react';
import { Link } from 'react-router-dom';
import HeaderOwner from './HeaderOwner';

const Dashboard = () => {
  return (
    <>
      <HeaderOwner />
      <Link to="/orders">Orders</Link>
      <Link to="/today-menu-owner">Today Menu</Link>
      <Link to="/products-list">Products List</Link>
      <Link to="/new-product">New Product</Link>
    </>
  );
};

export default Dashboard;
