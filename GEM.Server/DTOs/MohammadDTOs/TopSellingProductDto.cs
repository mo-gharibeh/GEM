namespace GEM.Server.DTOs.MohammadDTOs
{
    public class TopSellingProductDto
    {
        public int ProductID { get; set; }
        public string ProductName { get; set; }
        public string Image { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int TotalSold { get; set; }
    }
}
