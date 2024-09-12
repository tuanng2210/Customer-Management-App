import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CustomerList from "../components/CustomerList";
import "@testing-library/jest-dom/extend-expect";
import { act } from "react";

describe("CustomerList", () => {
  const customers = [
    { _id: "1", name: "John Doe", email: "john@example.com", password: "123" },
    {
      _id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      password: "456",
    },
  ];

  const defaultProps = {
    customers,
    selectedCustomer: null,
    onCustomerClick: jest.fn(),
  };

  it("renders a table with customers", () => {
    act(() => {
      render(<CustomerList {...defaultProps} />);
    });

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
    expect(screen.getByText("jane@example.com")).toBeInTheDocument();
  });

  it("calls onCustomerClick when a customer row is clicked", () => {
    act(() => {
      render(<CustomerList {...defaultProps} />);
    });

    const johnDoeRow = screen.getByText("John Doe").closest("tr");
    fireEvent.click(johnDoeRow);

    expect(defaultProps.onCustomerClick).toHaveBeenCalledWith(customers[0]);
  });

  it("applies bold style to the selected customer", () => {
    const selectedCustomerProps = {
      ...defaultProps,
      selectedCustomer: customers[0],
    };

    act(() => {
      render(<CustomerList {...selectedCustomerProps} />);
    });

    const johnDoeRow = screen.getByText("John Doe").closest("tr");

    expect(johnDoeRow).toHaveStyle("font-weight: bold");
  });

  it("does not apply bold style to unselected customers", () => {
    act(() => {
      render(<CustomerList {...defaultProps} />);
    });

    const janeSmithRow = screen.getByText("Jane Smith").closest("tr");

    expect(janeSmithRow).toHaveStyle("font-weight: normal");
  });
});
