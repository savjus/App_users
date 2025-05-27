import React from 'react';
import './App.css';

// API functions
const fetchEmployees = (baseUrl) => fetch(`${baseUrl}/api/employees`);

const createEmployee = (baseUrl, employee) =>
    fetch(`${baseUrl}/api/employees`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employee),
    });


const updateEmployee = (baseUrl, employee) =>
    fetch(`${baseUrl}/api/employees/${employee.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employee),
    });


const deleteEmployee = (baseUrl, id) =>
    fetch(`${baseUrl}/api/employees/${id}`, {
        method: 'DELETE',
    });



const EmployeeApp = () => {
    const baseUrl = 'https://localhost:7261'; // Assign baseUrl here
    const [employees, setEmployees] = React.useState([]);
    const [isLoading, setLoading] = React.useState(true);
    const nameRef = React.useRef(null);
    const emailRef = React.useRef(null);
    const phoneRef = React.useRef(null);
    const salaryRef = React.useRef(null);

    // Fetch employees from the backend
    const setupData = async () => {
        const response = await fetchEmployees(baseUrl);
        const data = await response.json();
        setEmployees(data);
        setLoading(false);
    };

    React.useEffect(() => {
        setupData();
        return () => { };
    }, [isLoading]);




    // Create a new employee
    const onCreateEmployee = async () => {
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const phone = phoneRef.current.value;
        const salary = parseFloat(salaryRef.current.value);
        setLoading(true);
        await createEmployee(baseUrl, { name, email, phone, salary });
        setLoading(false);
        nameRef.current.value = '';
        emailRef.current.value = '';
        phoneRef.current.value = '';
        salaryRef.current.value = '';
    };



    // Update an employee
    const onUpdateEmployee = async (employee) => {
        const updatedEmployee = {
            ...employee,
            name: prompt('Enter new name:', employee.name) || employee.name,
            email: prompt('Enter new email:', employee.email) || employee.email,
            phone: prompt('Enter new phone:', employee.phone) || employee.phone,
            salary: parseFloat(prompt('Enter new salary:', employee.salary)) || employee.salary,
        };
        setLoading(true);
        await updateEmployee(baseUrl, updatedEmployee);
        setLoading(false);
    };




    // Delete an employee
    const onRemoveEmployee = async (e, employee) => {
        e.preventDefault();
        setLoading(true);
        await deleteEmployee(baseUrl, employee.id);
        setLoading(false);
    };




    const content = (
        <div className="employee-app-container">
            <form>
                <input disabled={isLoading} placeholder="Name" ref={nameRef} />
                <input disabled={isLoading} placeholder="Email" ref={emailRef} />
                <input disabled={isLoading} placeholder="Phone" ref={phoneRef} />
                <input disabled={isLoading} placeholder="Salary" ref={salaryRef} type="number" />
                <button disabled={isLoading} type="button" onClick={onCreateEmployee}>
                    Add Employee
                </button>
            </form>
            <table className="employee-list">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Salary</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee.id}>
                            <td>{employee.name}</td>
                            <td>{employee.email}</td>
                            <td>{employee.phone || 'N/A'}</td>
                            <td>${employee.salary.toFixed(2)}</td>
                            <td>
                                <button onClick={() => onUpdateEmployee(employee)}>Edit</button>
                                <button onClick={(e) => onRemoveEmployee(e, employee)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    return (
        <>
            <h3>Employee Management App</h3>
            {content}
        </>
    );
};

export default EmployeeApp;
