using System;
using System.Collections.Generic;

namespace GEM.Server.Models;

public partial class Payment
{
    public int PaymentId { get; set; }

    public int? TransactionId { get; set; }

    public int? OrderId { get; set; }

    public decimal? Amount { get; set; }

    public string? PaymentMethod { get; set; }

    public DateTime? PaymentDate { get; set; }

    public string? Statues { get; set; }

    public string? PaymentGateWay { get; set; }

    public virtual Order? Order { get; set; }
}
