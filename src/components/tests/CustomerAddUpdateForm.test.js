import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CustomerAddUpdateForm from "../CustomerAddUpdateForm";
import "@testing-library/jest-dom/extend-expect";
import { act } from "react";

describe("CustomerAddUpdateForm", () => {
  const defaultProps = {
    formData: { name: "", email: "", password: "" },
    selectedCustomer: { _id: null },
    handleInputChange: jest.fn(),
    handleSave: jest.fn(),
    handleDelete: jest.fn(),
    handleCancel: jest.fn(),
  };

  it("renders the form with Add Customer title when no customer is selected", () => {
    // Use act to wrap any updates that trigger state changes
    act(() => {
      render(<CustomerAddUpdateForm {...defaultProps} />);
    });

    expect(screen.getByText("Add Customer")).toBeInTheDocument();
    expect(screen.getByLabelText(/Name:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password:/i)).toBeInTheDocument();
  });

  it("renders the form with Update Customer title when a customer is selected", () => {
    const selectedCustomerProps = {
      ...defaultProps,
      selectedCustomer: { _id: "123", name: "John Doe" },
    };

    render(<CustomerAddUpdateForm {...selectedCustomerProps} />);

    expect(screen.getByText("Update Customer")).toBeInTheDocument();
  });

  it("calls handleInputChange when input values change", () => {
    render(<CustomerAddUpdateForm {...defaultProps} />);

    const nameInput = screen.getByLabelText(/Name:/i);
    fireEvent.change(nameInput, { target: { value: "Jane Doe" } });

    expect(defaultProps.handleInputChange).toHaveBeenCalledTimes(1);
  });

  it("calls handleSave when the Save button is clicked", () => {
    render(<CustomerAddUpdateForm {...defaultProps} />);

    const saveButton = screen.getByText("Save");
    fireEvent.click(saveButton);

    expect(defaultProps.handleSave).toHaveBeenCalledTimes(1);
  });

  it("calls handleDelete when the Delete button is clicked", () => {
    render(<CustomerAddUpdateForm {...defaultProps} />);

    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);

    expect(defaultProps.handleDelete).toHaveBeenCalledTimes(1);
  });

  it("calls handleCancel when the Cancel button is clicked", () => {
    render(<CustomerAddUpdateForm {...defaultProps} />);

    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);

    expect(defaultProps.handleCancel).toHaveBeenCalledTimes(1);
  });
});
