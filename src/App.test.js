import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import { getAll } from "./utility/api";
import "@testing-library/jest-dom/extend-expect";

// Mock the API functions
jest.mock("./utility/api", () => ({
  getAll: jest.fn(),
  deleteById: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
}));

describe("App Component", () => {
  const mockCustomers = [
    {
      _id: "1",
      name: "John Doe",
      email: "john@example.com",
      password: "password1",
    },
    {
      _id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      password: "password2",
    },
  ];

  beforeEach(() => {
    getAll.mockResolvedValue(mockCustomers);
  });

  it("renders customer list and form", async () => {
    render(<App />);

    // Wait for the customer list to be loaded
    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    });

    // Check for the form title when no customer is selected
    expect(screen.getByText("Add Customer")).toBeInTheDocument();

    // Check for form fields
    expect(screen.getByLabelText(/Name:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password:/i)).toBeInTheDocument();
  });
});
