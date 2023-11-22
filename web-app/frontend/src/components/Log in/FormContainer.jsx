import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";

function FormContainer() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function loginUser(event) {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:1337/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.user) {
        localStorage.setItem("token", data.user);
        alert("Login successful");
        window.location.href = "/dashboard";
      } else {
        alert("Please check your username and password");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  }

  return (
    <div style={style.container}>
      <Form style={style.form} onSubmit={loginUser}>
        <Form.Group controlId="username">
          <Form.Label style={style.label}>Username</Form.Label>
          <Form.Control
            type="username"
            placeholder="username"
            style={style.input}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formGroupPassword">
          <Form.Label style={style.label}>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="  Password"
            style={style.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" style={style.button}>
          Login
        </Button>
        <br />
        <br />
        <div>Forgot Password?</div>
      </Form>
    </div>
  );
}

const style = {
  container: {
    width: "350px",
    margin: "auto",
    marginTop: "60px",
  },
  form: {
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
  label: {
    fontWeight: "bold",
    marginBottom: "8px",
    display: "block",
    borderRadius: "8px",
  },
  input: {
    width: "100%",
    padding: "8px",
    marginBottom: "16px",
    boxSizing: "border-box",
    borderRadius: "20px",
  },
  button: {
    width: "100%",
    backgroundColor: "#007bff",
    borderColor: "#007bff",
    marginTop: "16px",
    padding: "5px",
    borderRadius: "20px",
    display: "grid",
    placeItem: "center",
  },
};

export default FormContainer;