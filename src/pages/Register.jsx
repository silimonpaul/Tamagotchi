import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase';
import styled from 'styled-components';

const RegisterContainer = styled.div`
  max-width: 400px;
  margin: 100px auto;
  padding: 20px;
  text-align: center;
`;

const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;

      alert('Check your email for the confirmation link!');
      navigate('/login');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <RegisterContainer>
      <h1>Create Account</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <RegisterForm onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          required
        />
        <button type="submit">Register</button>
      </RegisterForm>
    </RegisterContainer>
  );
};

export default Register;