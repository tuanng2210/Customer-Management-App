import React, { useState, useEffect } from "react";
import { Table, Card, Form, Button, Container } from "react-bootstrap";
import { getAll, get, deleteById, post, put } from "./memdb";

const App = () => {
  const [customers, setCustomers] = useState([]);

  const blankCustomer = {
    id: -1,
    name: "",
    email: "",
    password: "",
  };

  const [selectedCustomer, setSelectedCustomer] = useState(blankCustomer);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleDelete = () => {
    if (!selectedCustomer) return;

    deleteById(selectedCustomer.id);
    const updatedCustomers = customers.filter(
      (customer) => customer.id !== selectedCustomer.id
    );
    setCustomers(updatedCustomers);
    setSelectedCustomer(blankCustomer);
    setFormData({
      name: "",
      email: "",
      password: "",
    });
  };

  const handleSave = async () => {
    if (selectedCustomer.id === -1) {
      // "Add" mode
      try {
        await post(formData);
        getCustomers();
      } catch (error) {
        console.error("Error adding customer:", error);
      }
    } else {
      // "Update" mode
      try {
        await put(selectedCustomer.id, formData);
        getCustomers();
      } catch (error) {
        console.error("Error updating customer:", error);
      }
    }
    // Clear the form and de-select the customer
    setSelectedCustomer(blankCustomer);
    setFormData({
      name: "",
      email: "",
      password: "",
    });
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
        password: customer.password,
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const getCustomers = async () => {
    try {
      const allCustomers = await getAll();
      setCustomers(allCustomers);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  useEffect(() => {
    getCustomers();
  }, []);

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
                <th>Password</th>
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
                  <td>{customer.password}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Card className="mt-5 mb-5">
        <Card.Body>
          <h1 className="mt-4 mb-3">
            {selectedCustomer.id === -1 ? "Add Customer" : "Update Customer"}
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
