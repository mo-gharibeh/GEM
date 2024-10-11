using GEM.Server.Models;

namespace GEM.Server.DTOs
{
    public class CartDTORequist
    {

        public int? ProductId { get; set; }

        public int? Quantity { get; set; }

        public decimal? Price { get; set; }


    }
}
