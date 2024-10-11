using System;
using System.Collections.Generic;

namespace GEM.Server.Models;

public partial class ClassAndGym
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public string? Trainer { get; set; }

    public string? Description { get; set; }

    public decimal? Price { get; set; }

    public bool? Flag { get; set; }

    public string? Image { get; set; }

    public virtual ICollection<ClassSubscription> ClassSubscriptions { get; set; } = new List<ClassSubscription>();

    public virtual ICollection<ClassTime> ClassTimes { get; set; } = new List<ClassTime>();
}
