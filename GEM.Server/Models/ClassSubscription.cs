using System;
using System.Collections.Generic;

namespace GEM.Server.Models;

public partial class ClassSubscription
{
    public int Id { get; set; }

    public DateTime? Duration { get; set; }

    public decimal? FinalPrice { get; set; }

    public int? ClassId { get; set; }

    public virtual ClassAndGym? Class { get; set; }

    public virtual ICollection<Enrolled> Enrolleds { get; set; } = new List<Enrolled>();
}
