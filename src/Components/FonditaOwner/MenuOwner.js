import React from 'react';
import { NavLink } from 'react-router-dom';

const MenuOwner = () => {
  return (
    <div>
      <ul>
        <li>
          <NavLink to="/orders">Orders</NavLink>
        </li>
        <li>
          <NavLink to="/today-menu-owner">Today Menu</NavLink>
        </li>
        <li>
          <NavLink to="/dishes-list">Dishes List</NavLink>
        </li>
        <li>
          <NavLink to="/new-dish">New dish</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default MenuOwner;
