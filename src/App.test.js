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
  const mockCustomers = [
    { _id: "1", name: "John Doe", email: "john@example.com", password: "1234" },
    {
      _id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      password: "5678",
    },
  ];

  beforeEach(() => {
    getAll.mockResolvedValue(mockCustomers);
  });

  test("renders customer list", async () => {
    render(<App />);

    expect(await screen.findByText("Customer List")).toBeInTheDocument();

    // Wait for the customers to be loaded and displayed
    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    });
  });

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
