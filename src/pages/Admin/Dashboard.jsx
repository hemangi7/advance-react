// src/components/AdminDashboard.js
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'

import backgroundImage from '../../assets/images/bg-img/06.jpg';

const DashboardContainer = styled.div`
  text-align: center;
  margin-top: 20px;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  height: 100vh;  // Adjust the height as needed
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 150px;
`;

const DashboardButton = styled.button`
  background-color: ${(props) => props.color || 'lightblue'};
  color: white;
  padding: 60px;
  font-size: 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

const Dashboard = () => {
  return (
    <DashboardContainer>
      <h2>Welcome to the Admin Dashboard</h2>
      <ButtonContainer>
      <Link to="/add-product">
          <DashboardButton color="green">Add Product</DashboardButton>
        </Link>
        <Link to="/orders">
          <DashboardButton color="orange">Orders</DashboardButton>
        </Link>
        <Link to="/products">
          <DashboardButton color="purple">Products</DashboardButton>
        </Link>
      </ButtonContainer>
    </DashboardContainer>
  );
};

export default Dashboard;
