namespace AdministracionFlotillas.ModelosComunes;

/// <summary>
/// Representa un cliente
/// </summary>
public class Customer
{
    public int CustomerId { get; set; }
    public string CustomerName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string? Phone { get; set; }
    public string? Address { get; set; }
    public string? City { get; set; }
    public string? State { get; set; }
    public string? ZipCode { get; set; }
    public string? Country { get; set; }
    public string Status { get; set; } = "ACTIVE"; // ACTIVE, INACTIVE
    public DateTime? RegistrationDate { get; set; }
    public decimal? CreditLimit { get; set; }
}
