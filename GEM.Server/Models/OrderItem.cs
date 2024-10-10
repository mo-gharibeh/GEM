using System;
using System.Collections.Generic;

namespace GEM.Server.Models;

public partial class OrderItem
{
    public int OrderItemId { get; set; }

    public int? OrderId { get; set; }

    public int? ProductId { get; set; }

    public int? Quantity { get; set; }

    public decimal? TotalAmount { get; set; }

    public virtual Order? Order { get; set; }

    public virtual Product? Product { get; set; }
}
