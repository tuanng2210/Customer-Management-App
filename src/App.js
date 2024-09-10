import React, { useState, useEffect } from "react";
import { Table, Card, Form, Button, Container } from "react-bootstrap";

const App = () => {
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "Tuan Nguyen",
      email: "tuan.nguyen@example.com",
      pass: "password123",
    },
    {
      id: 2,
      name: "Areeb Nabi",
      email: "areeb.nabi@example.com",
      pass: "mypassword",
    },
    {
      id: 3,
      name: "Kelsey Maratan",
      email: "kelsey.maratan@example.com",
      pass: "securepass",
    },
  ]);

  const blankCustomer = {
    id: -1,
    name: "",
    email: "",
    pass: "",
  };

  const [selectedCustomer, setSelectedCustomer] = useState(blankCustomer);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleDelete = () => {
    console.log("Delete button clicked");
  };

  const handleSave = () => {
    console.log("Save button clicked");
  };

  const handleCancel = () => {
    setSelectedCustomer(blankCustomer);
    setFormData({
      name: "",
      email: "",
      password: "",
    });
  };

  const handleCustomerClick = (customer) => {
    if (selectedCustomer?.id === customer.id) {
      setSelectedCustomer(blankCustomer);
      setFormData({ name: "", email: "", password: "" });
    } else {
      setSelectedCustomer(customer);
      setFormData({
        name: customer.name,
        email: customer.email,
        password: customer.pass,
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Container className="mt-5">
      <Card>
        <Card.Body>
          <h1 className="mb-4">Customer List</h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th> {/* Column for passwords */}
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr
                  key={customer.id}
                  onClick={() => handleCustomerClick(customer)}
                  style={{
                    cursor: "pointer",
                    fontWeight:
                      selectedCustomer?.id === customer.id ? "bold" : "normal",
                  }}
                >
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.pass}</td> {/* Display password */}
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Card className="mt-5 mb-5">
        <Card.Body>
          <h1 className="mt-4 mb-3">
            {selectedCustomer.id === -1 ? "Update Customer" : "Add Customer"}
          </h1>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </Form.Group>

            <div className="mt-3">
              <Button variant="danger" onClick={handleDelete}>
                Delete
              </Button>
              <Button variant="primary" className="ms-2" onClick={handleSave}>
                Save
              </Button>
              <Button
                variant="secondary"
                className="ms-2"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default App;
