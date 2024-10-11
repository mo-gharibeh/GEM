﻿using GEM.Server.Models;

namespace GEM.Server.DTOs
{
    public class CartDTORequist
    {
        public int? CartId { get; set; }
        public int? ProductId { get; set; }

        public int? Quantity { get; set; }

        public decimal? Price { get; set; }

        public virtual Cart? Cart { get; set; }

   
    }
}
