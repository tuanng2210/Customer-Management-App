import React, { useState, useEffect } from "react";
import { Card, Container } from "react-bootstrap";
import { getAll, deleteById, post, put } from "./utility/api";
import CustomerList from "./components/CustomerList";
import CustomerAddUpdateForm from "./components/CustomerAddUpdateForm";

const App = () => {
  // State to store the list of customers
  const [customers, setCustomers] = useState([]);

  // Initial blank customer object used for resetting selections
  const blankCustomer = {
    _id: null,
    name: "",
    email: "",
    password: "",
  };

  // State to store the currently selected customer
  const [selectedCustomer, setSelectedCustomer] = useState(blankCustomer);

  // State to store form data for adding/updating customers
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Handle the deletion of a customer
  const handleDelete = async () => {
    if (!selectedCustomer) return;

    try {
      // Delete the selected customer by ID
      await deleteById(selectedCustomer._id);

      // Filter out the deleted customer from the list
      const updatedCustomers = customers.filter(
        (customer) => customer._id !== selectedCustomer._id
      );
      setCustomers(updatedCustomers);

      // Reset the selected customer and form data
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

  // Handle saving (adding/updating) a customer
  const handleSave = async () => {
    try {
      // If no ID, add a new customer
      if (selectedCustomer._id === null) {
        await post(formData);
      } else {
      // If ID exists, update the existing customer
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

  // Handle canceling the form, resetting the selection and form data
  const handleCancel = () => {
    setSelectedCustomer(blankCustomer);
    setFormData({
      name: "",
      email: "",
      password: "",
    });
  };

  // Handle customer list item click, selecting/deselecting a customer
  const handleCustomerClick = (customer) => {
    if (selectedCustomer?._id === customer._id) {
      // Deselect if the customer is already selected
      setSelectedCustomer(blankCustomer);
      setFormData({ name: "", email: "", password: "" });
    } else {
      // Select the clicked customer and populate the form with their data
      setSelectedCustomer(customer);
      setFormData({
        name: customer.name,
        email: customer.email,
        password: customer.password,
      });
    }
  };

  // Handle changes in form input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Fetch all customers from the API and update the state
  const getCustomers = async () => {
    try {
      const allCustomers = await getAll();
      setCustomers(allCustomers);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  // Use the useEffect hook to fetch customers when the component mounts
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
