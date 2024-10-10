using System;
using System.Collections.Generic;

namespace GEM.Server.Models;

public partial class ContactU
{
    public int ContcatId { get; set; }

    public string? Name { get; set; }

    public string? Email { get; set; }

    public string? Subject { get; set; }

    public string? MessageContent { get; set; }

    public DateTime? SentDate { get; set; }
}
