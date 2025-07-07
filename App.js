import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import EmployeeForm from './components/EmployeeForm';
import EmployeeList from './components/EmployeeList';

function App() {
  // Load existing employees from localStorage or initialize with empty list
  const [employees, setEmployees] = useState(() => {
    const saved = localStorage.getItem('employees');
    return saved ? JSON.parse(saved) : [];
  });

  // Track which employee is currently being edited (null when not editing)
  const [employeeBeingEdited, setEmployeeBeingEdited] = useState(null);

  // Keep localStorage updated whenever employees list changes
  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees));
  }, [employees]);

  // Unified handler for both adding and updating employees
  const saveEmployee = (employee) => {
    if (employeeBeingEdited) {
      // Update mode
      const updatedList = employees.map((emp) =>
        emp.EmployeeId === employeeBeingEdited.EmployeeId
          ? { ...employee, EmployeeId: emp.EmployeeId }
          : emp
      );
      setEmployees(updatedList);
      setEmployeeBeingEdited(null); // Reset form
    } else {
      // Add mode
      const newEmployee = { ...employee, EmployeeId: Date.now() };
      setEmployees([...employees, newEmployee]);
    }
  };

  // Triggered when user clicks "Edit" — populates form fields
  const editEmployee = (id) => {
    const emp = employees.find((e) => e.EmployeeId === id);
    if (emp) {
      setEmployeeBeingEdited(emp);
    }
  };

  // Deletes employee from list with confirmation
  const deleteEmployee = (id) => {
    const employee = employees.find((emp) => emp.EmployeeId === id);
    if (!employee) return;

    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${employee.name}?`
    );

    if (confirmDelete) {
      setEmployees(employees.filter((emp) => emp.EmployeeId !== id));
    }
  };

  return (
    <Router>
      <div className="App" style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
        <header style={{ textAlign: 'center', marginBottom: '20px' }}>
          <h1>Employee Manager</h1>
        </header>

        <Routes>
          <Route
            path="/"
            element={
              <>
                <EmployeeForm addEmployee={saveEmployee} employeeToEdit={employeeBeingEdited} />
                <hr style={{ width: '60%', margin: '10px auto' }} />
                <EmployeeList
                  employees={employees}
                  onEdit={editEmployee}
                  onDelete={deleteEmployee}
                />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

