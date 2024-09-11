import React from "react";
import { Table } from "react-bootstrap";

const CustomerList = ({ customers, selectedCustomer, onCustomerClick }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Password</th>
        </tr>
      </thead>
      <tbody>
        {customers.map((customer) => (
          <tr
            key={customer._id}
            onClick={() => onCustomerClick(customer)}
            style={{
              cursor: "pointer",
              fontWeight:
                selectedCustomer?._id === customer._id ? "bold" : "normal",
            }}
          >
            <td>{customer.name}</td>
            <td>{customer.email}</td>
            <td>{customer.password}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default CustomerList;
