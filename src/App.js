import React, { useState, useEffect } from "react";
import { Card, Container } from "react-bootstrap";
import { getAll, deleteById, post, put } from "./utility/api";
import CustomerList from "./components/CustomerList";
import CustomerAddUpdateForm from "./components/CustomerAddUpdateForm";

const App = () => {
  const [customers, setCustomers] = useState([]);

  const blankCustomer = {
    _id: null,
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

  const handleDelete = async () => {
    if (!selectedCustomer) return;

    try {
      await deleteById(selectedCustomer._id);
      const updatedCustomers = customers.filter(
        (customer) => customer._id !== selectedCustomer._id
      );
      setCustomers(updatedCustomers);
      setSelectedCustomer(blankCustomer);
      setFormData({
        name: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  const handleSave = async () => {
    try {
      if (selectedCustomer._id === null) {
        // "Add" mode
        await post(formData);
      } else {
        // "Update" mode
        await put(selectedCustomer._id, formData);
      }
      // Clear the form and de-select the customer
      setSelectedCustomer(blankCustomer);
      setFormData({
        name: "",
        email: "",
        password: "",
      });
      // Refresh the customer list
      getCustomers();
    } catch (error) {
      console.error("Error saving customer:", error);
    }
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
    if (selectedCustomer?._id === customer._id) {
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
          <CustomerList
            customers={customers}
            selectedCustomer={selectedCustomer}
            onCustomerClick={handleCustomerClick}
          />
        </Card.Body>
      </Card>

      <Card className="mt-5 mb-5">
        <Card.Body>
          <CustomerAddUpdateForm
            formData={formData}
            selectedCustomer={selectedCustomer}
            handleInputChange={handleInputChange}
            handleSave={handleSave}
            handleDelete={handleDelete}
            handleCancel={handleCancel}
          />
        </Card.Body>
      </Card>
    </Container>
  );
  
};

export default App;
