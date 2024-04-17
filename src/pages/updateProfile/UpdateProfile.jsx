import React, { useState,useContext } from "react";
import axios from "axios";
import styled from "styled-components";
import Navbar from "../../components/Navbar/Navbar";
import { AuthContext } from '../../context/AuthContext';

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

const UpdateProfile = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        phone: "",
      });
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState("");
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
      };

      const {user  }= useContext(AuthContext);
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
      
        try {
          const response = await axios.put(`https://the-booking-app-backend.onrender.com/api/users/${user._id}/update`, formData);
          // Profile updated successfully
          console.log("Profile updated successfully:", response.data);
          alert("Profile updated successfully."); // Display success message
          // Optionally, redirect or update UI accordingly here
        } catch (err) {
          console.error("Failed to update profile:", err);
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      
  return (
    <>
      <Navbar />
      <Container>
        <Wrapper>
          <Title>Update Profile</Title>
          <Form>
            <Input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={handleChange}
            />
            <Input
              type="password"
              name="password"
              required
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <Input
              type="text"
              name="phone"
              required
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
            />
            <Button disabled={loading} onClick={handleSubmit}>
              Update
            </Button>
            {error && <Error>{error}</Error>}
          </Form>
        </Wrapper>
      </Container>
    </>
  );
};

export default UpdateProfile;