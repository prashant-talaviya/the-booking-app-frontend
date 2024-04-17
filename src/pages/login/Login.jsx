


import { useContext, useState } from "react";
import "./login.css";
import styled from "styled-components";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { AuthContext } from "../../context/AuthContext";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://t3.ftcdn.net/jpg/03/55/60/70/360_F_355607062_zYMS8jaz4SfoykpWz5oViRVKL32IabTP.jpg")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: #0071c2;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;

const Error = styled.span`
  color: red;
`;

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [showForgotPassword, setShowForgotPassword] = useState(false); // State to control the visibility of the forgot password input

  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/");
    } catch (err) {
      console.error(err);
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      // Send request to handle forgot password
      const response = await axios.post("https://the-booking-app-backend.onrender.com/api/users/password/forgot", { email: credentials.email });
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to send password reset instructions.");
    }
  };


  return (
    <>
      <Navbar />
      <ToastContainer />
      <Container>
        <Wrapper>
          <Title>Login Here</Title>
          <Form>
            <Input
              type="email"
              id="email"
              placeholder="Email"
              value={credentials.email}
              onChange={handleChange}
              required
            />
            <Input
              type="password"
              id="password"
              placeholder="Password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
            <Button disabled={loading} onClick={handleClick}>Login</Button>
            {error && <Error>{error.message}</Error>}
            <Link onClick={() => setShowForgotPassword(true)}>Forgot Password?</Link>
            {showForgotPassword && ( // Conditionally render the forgot password input
              <>
                <Input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={credentials.email}
                  onChange={handleChange}
                />
                <Button onClick={handleForgotPassword}>Submit</Button>
                <Link onClick={() => setShowForgotPassword(false)}>Cancel</Link>
              </>
            )}
            <Link to="/registration">CREATE A NEW ACCOUNT</Link>
          </Form>
        </Wrapper>
      </Container>
    </>
  );
};

export default Login;
