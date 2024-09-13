import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";
import { getAll, deleteById, post, put } from "./utility/api";

// Mocking API functions
jest.mock("./utility/api", () => ({
  getAll: jest.fn(),
  deleteById: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
}));

describe("App Component", () => {

  // Mock data to simulate API responses
  const mockCustomers = [
    { _id: "1", name: "John Doe", email: "john@example.com", password: "1234" },
    {
      _id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      password: "5678",
    },
  ];

  // Before each test, mock the getAll API function to return the mockCustomers
  beforeEach(() => {
    getAll.mockResolvedValue(mockCustomers);
  });

   // Test that the customer list is rendered correctly
  test("renders customer list", async () => {
    render(<App />);

    // Check if the "Customer List" title is present
    expect(await screen.findByText("Customer List")).toBeInTheDocument();

    // Wait for the customers to be loaded and displayed
    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    });
  });

  // Test that selecting a customer updates the form fields
  test("handles customer selection", async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
    });

    const johnDoe = screen.getByText("John Doe");

    // Click on John Doe's name to select him
    fireEvent.click(johnDoe);

    // Check if the form fields are updated
    expect(screen.getByDisplayValue("John Doe")).toBeInTheDocument();
    expect(screen.getByDisplayValue("john@example.com")).toBeInTheDocument();
  });

   // Test that adding a new customer works correctly
  test("handles adding a new customer", async () => {
    render(<App />);

    // Change form inputs to simulate adding a new customer
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "New Customer" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "new@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password" },
    });

    // Mock the post API response
    post.mockResolvedValue({
      _id: "3",
      name: "New Customer",
      email: "new@example.com",
      password: "password",
    });

    // Click the Save button to submit the form
    fireEvent.click(screen.getByText(/save/i));

    // Check if the post function was called
    await waitFor(() => {
      expect(post).toHaveBeenCalledWith({
        name: "New Customer",
        email: "new@example.com",
        password: "password",
      });
    });
  });

  // Test that updating an existing customer's details works correctly  
  test("handles updating an existing customer", async () => {
    render(<App />);

    // Wait for the customers to be loaded
    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
    });

    const johnDoe = screen.getByText("John Doe");

    // Click to select John Doe
    fireEvent.click(johnDoe);

    // Change the email field to simulate editing
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "john.updated@example.com" },
    });

    // Mock the put API response
    put.mockResolvedValue({
      _id: "1",
      name: "John Doe",
      email: "john.updated@example.com",
      password: "1234",
    });

    // Click the Save button to submit the form
    fireEvent.click(screen.getByText(/save/i));

    // Check if the put function was called with updated data
    await waitFor(() => {
      expect(put).toHaveBeenCalledWith("1", {
        name: "John Doe",
        email: "john.updated@example.com",
        password: "1234",
      });
    });
  });

  // Test that deleting a customer works correctly
  test("handles deleting a customer", async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
    });

    const johnDoe = screen.getByText("John Doe");

    // Click to select John Doe
    fireEvent.click(johnDoe);

    // Mock the delete API response
    deleteById.mockResolvedValueOnce({});

    fireEvent.click(screen.getByText(/delete/i));

    // Check if deleteById was called with the correct ID
    await waitFor(() => {
      expect(deleteById).toHaveBeenCalledWith("1");
    });

    // Check if the customer list no longer contains John Doe
    await waitFor(() => {
      expect(screen.queryByText("John Doe")).not.toBeInTheDocument();
    });
  });

  // Test that the cancel operation clears the form
  test("handles cancel operation", async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
    });

    const johnDoe = screen.getByText("John Doe");

    // Click to select John Doe
    fireEvent.click(johnDoe);

    // Click the Cancel button
    fireEvent.click(screen.getByText(/cancel/i));

    // Check if the form fields are cleared
    expect(screen.getByLabelText(/name/i).value).toBe("");
    expect(screen.getByLabelText(/email/i).value).toBe("");
    expect(screen.getByLabelText(/password/i).value).toBe("");
  });
});
