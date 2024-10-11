using System;
using System.Collections.Generic;

namespace GEM.Server.Models;

public partial class Tip
{
    public int TipsId { get; set; }

    public string? Title { get; set; }

    public string? Description { get; set; }

    public string? Tips { get; set; }
}
