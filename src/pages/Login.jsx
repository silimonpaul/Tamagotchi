import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase';
import styled from 'styled-components';

const LoginContainer = styled.div`
  max-width: 400px;
  margin: 100px auto;
  padding: 20px;
  text-align: center;
  background-color: #9BA94C;
  border-radius: 10px;
  box-shadow: inset 0 0 10px rgba(0,0,0,0.3);
  font-family: 'Courier New', monospace;
  color: #1C2910;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px;
`;

const Input = styled.input`
  padding: 10px;
  border: 2px solid #1C2910;
  border-radius: 5px;
  background: #d4d9a3;
  color: #1C2910;
  font-family: 'Courier New', monospace;

  &:focus {
    outline: none;
    border-color: #4A5A23;
  }
`;

const Button = styled.button`
  background: #4A5A23;
  border: 2px solid #1C2910;
  color: #9BA94C;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-family: 'Courier New', monospace;
  font-size: 16px;
  
  &:hover {
    background: #1C2910;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: #ff0000;
  margin: 10px 0;
  padding: 10px;
  background: rgba(255, 0, 0, 0.1);
  border-radius: 5px;
`;

const Link = styled.a`
  color: #1C2910;
  text-decoration: none;
  font-weight: bold;
  
  &:hover {
    text-decoration: underline;
  }
`;

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        navigate('/');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginContainer>
      <h1>🎮 Login to Play</h1>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <LoginForm onSubmit={handleLogin}>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          required
        />
        <Button type="submit" disabled={loading}>
          {loading ? '🔄 Logging in...' : '🚀 Login'}
        </Button>
      </LoginForm>
      <p>
        Don't have an account?{' '}
        <Link href="/register">Register here</Link>
      </p>
    </LoginContainer>
  );
};

export default Login;