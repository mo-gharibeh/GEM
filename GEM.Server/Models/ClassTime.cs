using System;
using System.Collections.Generic;

namespace GEM.Server.Models;

public partial class ClassTime
{
    public int Id { get; set; }

    public int? ClassId { get; set; }

    public DateTime? StartTime { get; set; }

    public DateTime? EndTime { get; set; }

    public virtual ClassAndGym? Class { get; set; }

    public virtual ICollection<Enrolled> Enrolleds { get; set; } = new List<Enrolled>();
}
