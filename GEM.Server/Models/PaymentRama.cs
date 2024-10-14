using System;
using System.Collections.Generic;

namespace GEM.Server.Models;

public partial class PaymentRama
{
    public int Id { get; set; }

    public int EnrollmentId { get; set; }

    public decimal Amount { get; set; }

    public string PaymentMethod { get; set; } = null!;

    public DateTime PaymentDate { get; set; }

    public string Status { get; set; } = null!;

    public string PaymentGateway { get; set; } = null!;

    public virtual Enrolled Enrollment { get; set; } = null!;
}
