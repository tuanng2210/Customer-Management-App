import React from "react";
import { Form, Button } from "react-bootstrap";

const CustomerAddUpdateForm = ({
  formData,
  selectedCustomer,
  handleInputChange,
  handleSave,
  handleDelete,
  handleCancel,
}) => {
  return (
    <Form>
      <h1 className="mt-4 mb-3">
        {selectedCustomer._id === null ? "Add Customer" : "Update Customer"}
      </h1>

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
        <Button variant="secondary" className="ms-2" onClick={handleCancel}>
          Cancel
        </Button>
      </div>
    </Form>
  );
};

export default CustomerAddUpdateForm;
