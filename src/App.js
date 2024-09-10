import React, { useState, useEffect } from "react";

const App = () => {
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "Tuan Nguyen",
      email: "tuan.nguyen@example.com",
      pass: "password123",
    },
    {
      id: 2,
      name: "Areeb Nabi",
      email: "areeb.nabi@example.com",
      pass: "mypassword",
    },
    {
      id: 3,
      name: "Kelsey Maratan",
      email: "kelsey.maratan@example.com",
      pass: "securepass",
    },
  ]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleDelete = () => {
    console.log("Delete button clicked");
  };

  const handleSave = () => {
    console.log("Save button clicked");
  };

  const handleCancel = () => {
    console.log("Cancel button clicked");
  };

  const handleCustomerClick = (customer) => {
    console.log("Customer clicked:", customer);
  };

  return (
    <div>
      <h1>Customer List</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th> {/* Column for passwords */}
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr
              key={customer.id}
              onClick={() => handleCustomerClick(customer)}
              style={{ cursor: "pointer" }}
            >
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.pass}</td> {/* Display password */}
            </tr>
          ))}
        </tbody>
      </table>

      <h1> Add Customer</h1>
      <form>
        <div>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        <div>
          <button type="button" onClick={handleDelete}>
            Delete
          </button>
          <button type="button" onClick={handleSave}>
            Save
          </button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default App;
