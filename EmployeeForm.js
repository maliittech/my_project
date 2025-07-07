// Import external CSS for styling
import './EmployeeForm.css';
import React from 'react';

class EmployeeForm extends React.Component {
  constructor(props) {
    super(props);

    // If editing, pre-fill form with data; else start with empty fields
    this.state = props.employeeToEdit || {
      name: '',
      email: '',
      title: '',
      department: '',
      phone: ''
    };
  }

  // This method runs when component receives new props (e.g., user clicks "Edit")
  componentDidUpdate(prevProps) {
    // Only update the form fields if the selected employee has changed
    if (
      this.props.employeeToEdit &&
      this.props.employeeToEdit !== prevProps.employeeToEdit
    ) {
      this.setState({ ...this.props.employeeToEdit });
    }
  }

  // Updates specific state field as user types
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  // Handle form submission (either Add or Update mode)
  handleSubmit = (event) => {
    event.preventDefault(); // Prevent page refresh

    const { name, email, title, department, phone } = this.state;
    const updatedEmployee = { name, email, title, department, phone };

    // Call the parent component’s save function (adds or updates)
    this.props.addEmployee(updatedEmployee);

    // Clear form after submit
    this.setState({
      name: '',
      email: '',
      title: '',
      department: '',
      phone: ''
    });
  };

  render() {
    const isEditing = !!this.props.employeeToEdit; // Boolean flag for edit mode

    return (
      <div className="employee-form-container">
        <form onSubmit={this.handleSubmit}>
          <h2>{isEditing ? 'Update Employee' : 'Employee Form'}</h2>

          {/* Input rows */}
          <div className="form-row">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
              required
            />
          </div>

          <div className="form-row">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              required
            />
          </div>

          <div className="form-row">
            <label htmlFor="title">Job Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={this.state.title}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-row">
            <label htmlFor="department">Department:</label>
            <input
              type="text"
              id="department"
              name="department"
              value={this.state.department}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-row">
            <label htmlFor="phone">Phone:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={this.state.phone}
              onChange={this.handleChange}
            />
          </div>

          {/* Submit button switches based on add/edit mode */}
          <button type="submit">
            {isEditing ? 'Update' : 'Add'}
          </button>
        </form>
      </div>
    );
  }
}

export default EmployeeForm;