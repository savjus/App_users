namespace App.Models
{
    //same as employee.cs
    // no guid because we will generate one, not set.
    public class AddEmpoyeeDto
    {
        public required string Name { get; set; }
        public required string Email { get; set; }
        public string? Phone { get; set; }
        public decimal Salary { get; set; }
    }
}
