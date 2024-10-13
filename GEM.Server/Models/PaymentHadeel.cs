using System;
using System.Collections.Generic;

namespace GEM.Server.Models;

public partial class PaymentHadeel
{
    public int PaymentId { get; set; }

    public int UserId { get; set; }

    public int ClassSubId { get; set; }

    public int ClassTimeId { get; set; }

    public string PaymentToken { get; set; } = null!;

    public decimal Amount { get; set; }

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public string? CompanyName { get; set; }

    public string? Address { get; set; }

    public string Email { get; set; } = null!;

    public string? Phone { get; set; }

    public DateTime? CreatedAt { get; set; }
}
