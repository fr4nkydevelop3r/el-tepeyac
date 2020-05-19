import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

const MenuItemContainer = styled.div``;

const MenuItemButton = styled.button`
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
    url(https://firebasestorage.googleapis.com/v0/b/el-tepeyac-b5c7a.appspot.com/o/categories%2FTacos%2Ftacos-dorados.jpg?alt=media&token=9bff276e-6d2b-4a03-b0c2-ca1765e9f067);
  background-size: cover;
  width: 300px;
  height: 200px;
  position: relative;
  float: left;
  margin: 10px 0;
  h4 {
    font-family: 'Roboto', sans-serif;
    font-weight: 600;
    color: white;
    text-transform: uppercase;
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: 1.5rem;
    transform: translate(-50%, -50%);
  }
`;

const formatURL = (categoryName) => {
  const url = categoryName
    .replace(/[A-Z]/g, ' $&')
    .split(/[\W_]/)
    .filter((item) => item !== '')
    .map((item) => item.toLowerCase())
    .join('-');
  return url;
};

const MenuItem = ({ category, history }) => {
  const handleClick = () => {
    const catName = formatURL(category.categoryName);
    history.push(`/menu/${catName}`, {
      categoryID: `${category.categoryID}`,
    });
  };
  return (
    <>
      {/*  <div className="module mid">
        <button type="button" onClick={handleClick}>
          {category.categoryName}
        </button>
      </div> */}
      <MenuItemContainer>
        <MenuItemButton onClick={handleClick}>
          <h4>{category.categoryName}</h4>
        </MenuItemButton>
      </MenuItemContainer>
    </>
  );
};

export default withRouter(MenuItem);
