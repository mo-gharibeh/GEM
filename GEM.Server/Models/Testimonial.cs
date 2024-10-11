using System;
using System.Collections.Generic;

namespace GEM.Server.Models;

public partial class Testimonial
{
    public int Testimonialid { get; set; }

    public int? UserId { get; set; }

    public string? Status { get; set; }

    public string? Text { get; set; }

    public bool? TestimonialSubmit { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual User? User { get; set; }
}
