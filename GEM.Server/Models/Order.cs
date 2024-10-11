using System;
using System.Collections.Generic;

namespace GEM.Server.Models;

public partial class Order
{
    public int OrderId { get; set; }

    public int? UserId { get; set; }

    public decimal? TotalAmount { get; set; }

    public string? ShippngStatus { get; set; }

    public DateTime? OrderDate { get; set; }

    public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();

    public virtual ICollection<Payment> Payments { get; set; } = new List<Payment>();

    public virtual User? User { get; set; }
}
