using App.Data;
using App.Models;
using App.Models.Entities;
using Microsoft.AspNetCore.Mvc;

namespace App.Controllers
{
    //localhost:<port>/api/employees
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly ApplicationDBContext dBContext;

        public EmployeesController(ApplicationDBContext dBContext)
        {
            this.dBContext = dBContext;
        }


        //get all employees in database
        [HttpGet]
        public IActionResult GetAllEmployees()
        {
            var allEmployees = dBContext.Employees.ToList(); //connect to database
            return Ok(allEmployees); //code 200 return employee list 
        }



        //dto - data transfer object
        //we made the dto etity to seperate concern, these parameters are open to the outside 
        [HttpPost]
        public IActionResult AddEmployee(AddEmpoyeeDto addEmpoyeeDto)
        {
            //convert from dto to employee entity
            var employeeEntity = new Employee()
            {
                Name = addEmpoyeeDto.Name,
                Email = addEmpoyeeDto.Email,
                Phone = addEmpoyeeDto.Phone,
                Salary = addEmpoyeeDto.Salary
            };
            dBContext.Employees.Add(employeeEntity); // this doesn't add to databse
            dBContext.SaveChanges();                 // now it is in the database
            return Ok(employeeEntity); //code 200
        }

        //get a single specific employee
        [HttpGet]
        [Route("{id:guid}")] //this is to make things more type safe ((name)id matches the given (Guid id) paramter name)
        public IActionResult GetEmployeeById(Guid id)
        {
            var employee = dBContext.Employees.Find(id);  //nullable employee type (Employee?)
            if (employee == null)
            {
                return NotFound();          //OPTIONAL write message
            }
            return Ok(employee);
        }


        //updates the employee,
        //needs info which employee to update
        //needs parameters to update, again given by dto for security / understanding

        [HttpPut]//update
        [Route("{id:guid}")]
        public IActionResult UpdateEmployee(Guid id, UpdateEmployeeDto updateEmployeeDto)
        {
            //find
            var employee = dBContext.Employees.Find(id);
            if(employee == null)
            {
                return NotFound();
            }
            employee.Name = updateEmployeeDto.Name;
            employee.Email = updateEmployeeDto.Email;
            employee.Phone = updateEmployeeDto.Phone;
            employee.Salary = updateEmployeeDto.Salary;
            //again save changes
            dBContext.SaveChanges();
            return Ok(employee);
        }


        [HttpDelete]
        [Route("{id:guid}")]
        public IActionResult DeleteEmployeeById(Guid id)
        {
            var employee = dBContext.Employees.Find(id);
            if (employee == null)
            {
                return NotFound();
            }
            dBContext.Employees.Remove(employee);
            dBContext.SaveChanges();
            return Ok("sucess");
        }
    }
}
