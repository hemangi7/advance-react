// src/pages/Admin/AddProduct.js
import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { firestore } from '../../firebase/firebase.config';

const FullScreenContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 600px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled.h2`
  text-align: center;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const Label = styled.label`
  width: 100%;
  margin-top: 10px;
  font-size: 14px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  width: 100%;
  margin-top: 15px;
  padding: 10px;
  background-color: #3498db;
  color: #fff;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const AddProducts = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    // Add the product data to Firebase Firestore
    try {
      await firestore.collection('products').add(data);
      console.log('Product added successfully!');
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <FullScreenContainer>
      <FormContainer>
      <FormTitle>Add Product</FormTitle>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Label>
          Category:
          <Input type="text" {...register('category', { required: true })} />
        </Label>
        <Label>
          Id:
          <Input type="text" {...register('id', { required: true })} />
        </Label>
        <Label>
          Image:
          <Input type="text" {...register('img', { required: true })} />
        </Label>
        <Label>
          Name:
          <Input type="text" {...register('name', { required: true })} />
        </Label>
        <Label>
          Price:
          <Input type="text" {...register('price', { required: true })} />
        </Label>
        <Label>
          Quantity:
          <Input type="text" {...register('quantity', { required: true })} />
        </Label>
        <Label>
          Ratings:
          <Input type="text" {...register('ratings', { required: true })} />
        </Label>
        <Label>
          Ratings Count:
          <Input type="text" {...register('ratingsCount', { required: true })} />
        </Label>
        <Label>
          Seller:
          <Input type="text" {...register('seller', { required: true })} />
        </Label>
        <Label>
          Shipping:
          <Input type="text" {...register('shipping', { required: true })} />
        </Label>
        <Label>
          Stock:
          <Input type="text" {...register('stock', { required: true })} />
        </Label>
                {/* Repeat similar Label and Input fields for other product details */}
                <Button type="submit">Add Product</Button>
      </Form>
    </FormContainer>
    </FullScreenContainer>
  );
};

export default AddProducts;
