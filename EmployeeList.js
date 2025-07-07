import './EmployeeList.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function EmployeeList({ employees, onEdit, onDelete }) {
  const [searchTerm, setSearchTerm] = useState('');

  // Helper function to mask phone numbers
  const maskPhone = (phone) => {
    if (phone && phone.length >= 4) {
      return `xxx-xxx-${phone.slice(-4)}`;
    }
    return '';
  };

  // Filter by name based on search input
  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="employee-list">
      <h1>Employee List</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          marginBottom: '15px',
          padding: '8px',
          width: '60%',
          maxWidth: '300px',
          border: '1px solid #ccc',
          borderRadius: '5px',
        }}
      />

      {/* Employee Table */}
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th>Name</th>
            <th>Email</th>
            <th>Job Title</th>
            <th>Department</th>
            <th>Phone</th>
            <th>Actions</th> {/* Edit/Delete column */}
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee) => (
            <tr key={employee.EmployeeId}>
              <td>
                <Link to={`/employees/${employee.EmployeeId}`}>
                  <strong>{employee.name}</strong>
                </Link>
              </td>
              <td>{employee.email}</td>
              <td>{employee.title}</td>
              <td>{employee.department}</td>
              <td>{maskPhone(employee.phone)}</td>
              <td>
                <button
                  onClick={() => onEdit(employee.EmployeeId)}
                  style={{
                    marginRight: '8px',
                    padding: '5px 10px',
                    backgroundColor: '#ffc107',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(employee.EmployeeId)}
                  style={{
                    padding: '5px 10px',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeList;