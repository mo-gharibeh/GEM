using System;
using System.Collections.Generic;

namespace GEM.Server.Models;

public partial class Enrolled
{
    public int Id { get; set; }

    public int? UserId { get; set; }

    public int? ClassSubId { get; set; }

    public int? ClassTimeId { get; set; }

    public DateTime? StartDate { get; set; }

    public DateTime? EndDate { get; set; }

    public string? PaymentMethod { get; set; }

    public virtual ClassSubscription? ClassSub { get; set; }

    public virtual ClassTime? ClassTime { get; set; }

    public virtual ICollection<PaymentRama> PaymentRamas { get; set; } = new List<PaymentRama>();

    public virtual User? User { get; set; }
}
