import { sendPasswordResetEmail } from "firebase/auth";
import React from "react";
import { useState } from "react"; 
import { auth } from "../firebase/firebase.config";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";

function ForgotPassword(){
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");


    const handleSubmit = async(e)=>{
        e.preventDefault()
        const emailVal = e.target.email.value;
        sendPasswordResetEmail(auth,emailVal).then(data=>{
            alert("Check your email for the password reset link.")
            setErrorMessage("");
            navigate("/login");
        }).catch(error=>{
            console.error("Error sending password reset email:", error);
            setErrorMessage("Failed to send password reset email. Please try again.");
            setSuccessMessage("");
        })
    }
    return(
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Forgot Password</h2>
            {successMessage && <Alert variant="success">{successMessage}</Alert>}
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100">
                Reset Password
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
}
export default ForgotPassword;