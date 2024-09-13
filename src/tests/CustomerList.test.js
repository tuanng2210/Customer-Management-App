import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CustomerList from "../components/CustomerList";
import "@testing-library/jest-dom/extend-expect";
import { act } from "react"; // act is used to apply updates to the component for React's state and effects.

describe("CustomerList", () => {
  // Mocked customer data used in the tests
  const customers = [
    { _id: "1", name: "John Doe", email: "john@example.com", password: "123" },
    {
      _id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      password: "456",
    },
  ];
  
  //Initilize default props
  const defaultProps = {
    customers, // Customers data passed as props.
    selectedCustomer: null, // Initially, no customer is selected.
    onCustomerClick: jest.fn(), // Mock function to simulate the customer click handler.
  };

  // Test that the table renders the list of customers.
  it("renders a table with customers", () => {
    act(() => {
      render(<CustomerList {...defaultProps} />); // Render the component with defaultProps
    });

    // Check that customer names and emails are rendered correctly
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
    expect(screen.getByText("jane@example.com")).toBeInTheDocument();
  });

  // Test that clicking a customer row calls the onCustomerClick function
  it("calls onCustomerClick when a customer row is clicked", () => {
    act(() => {
      render(<CustomerList {...defaultProps} />);
    });

    const johnDoeRow = screen.getByText("John Doe").closest("tr"); // Get the table row for John Doe
    fireEvent.click(johnDoeRow); // Simulate a click event on the row

    expect(defaultProps.onCustomerClick).toHaveBeenCalledWith(customers[0]); // Verify that onCustomerClick is called with the correct customer
  });

  // Test that the selected customer is styled with bold text
  it("applies bold style to the selected customer", () => {
    const selectedCustomerProps = {
      ...defaultProps,
      selectedCustomer: customers[0], // Set the selected customer to John Doe
    };

    act(() => {
      render(<CustomerList {...selectedCustomerProps} />);
    });

    const johnDoeRow = screen.getByText("John Doe").closest("tr");

    expect(johnDoeRow).toHaveStyle("font-weight: bold"); // Verify that the selected customer row is styled as bold
  });

  // Test that unselected customers do not have bold styling
  it("does not apply bold style to unselected customers", () => {
    act(() => {
      render(<CustomerList {...defaultProps} />);
    });

    const janeSmithRow = screen.getByText("Jane Smith").closest("tr");

    expect(janeSmithRow).toHaveStyle("font-weight: normal"); // Verify that unselected customer rows are not bold
  });
});
