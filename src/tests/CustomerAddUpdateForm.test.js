import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CustomerAddUpdateForm from "../components/CustomerAddUpdateForm";
import "@testing-library/jest-dom/extend-expect";
import { act } from "react"; 

describe("CustomerAddUpdateForm", () => {

  //Initialize default props
  const defaultProps = {
    formData: { name: "", email: "", password: "" }, // Initial form data.
    selectedCustomer: { _id: null }, // No customer is selected by default.
    handleInputChange: jest.fn(), // Mock function for handling input changes.
    handleSave: jest.fn(), // Mock function for handling save action.
    handleDelete: jest.fn(), // Mock function for handling delete action.
    handleCancel: jest.fn(), // Mock function for handling cancel action.
  };

  // Test that the form renders with "Add Customer" title when no customer is selected.
  it("renders the form with Add Customer title when no customer is selected", () => {
    act(() => {
      render(<CustomerAddUpdateForm {...defaultProps} />); // Render the component with defaultProps.
    });

    // Check that the "Add Customer" title and input labels are present.
    expect(screen.getByText("Add Customer")).toBeInTheDocument();
    expect(screen.getByLabelText(/Name:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password:/i)).toBeInTheDocument();
  });

  // Test that the form renders with "Update Customer" title when a customer is selected.
  it("renders the form with Update Customer title when a customer is selected", () => {
    const selectedCustomerProps = {
      ...defaultProps,
      selectedCustomer: { _id: "123", name: "John Doe" }, // Set selected customer.
    };

    render(<CustomerAddUpdateForm {...selectedCustomerProps} />);

    // Check that the "Update Customer" title is present when a customer is selected.
    expect(screen.getByText("Update Customer")).toBeInTheDocument();
  });

  // Test that handleInputChange is called when input values change.
  it("calls handleInputChange when input values change", () => {
    render(<CustomerAddUpdateForm {...defaultProps} />);

    // Get the name input field and simulate a change event.
    const nameInput = screen.getByLabelText(/Name:/i);
    fireEvent.change(nameInput, { target: { value: "Jane Doe" } });

    // Verify that handleInputChange is called once.
    expect(defaultProps.handleInputChange).toHaveBeenCalledTimes(1);
  });

  // Test that handleSave is called when the Save button is clicked.
  it("calls handleSave when the Save button is clicked", () => {
    render(<CustomerAddUpdateForm {...defaultProps} />);

    // Get the Save button and simulate a click event.
    const saveButton = screen.getByText("Save");
    fireEvent.click(saveButton);

    // Verify that handleSave is called once.
    expect(defaultProps.handleSave).toHaveBeenCalledTimes(1);
  });

  // Test that handleDelete is called when the Delete button is clicked.
  it("calls handleDelete when the Delete button is clicked", () => {
    render(<CustomerAddUpdateForm {...defaultProps} />);

    // Get the Delete button and simulate a click event.
    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);

    // Verify that handleDelete is called once.
    expect(defaultProps.handleDelete).toHaveBeenCalledTimes(1);
  });

  // Test that handleCancel is called when the Cancel button is clicked.
  it("calls handleCancel when the Cancel button is clicked", () => {
    render(<CustomerAddUpdateForm {...defaultProps} />);

    // Get the Cancel button and simulate a click event.
    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);

    // Verify that handleCancel is called once.
    expect(defaultProps.handleCancel).toHaveBeenCalledTimes(1);
  });
});
