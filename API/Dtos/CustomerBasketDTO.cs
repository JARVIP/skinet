using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
    public class CustomerBasketDTO
    {
        [Required]
        public string Id { get; set; }
        
        public List<BasketItemDTO> Items { get; set; } = new List<BasketItemDTO>();
    }
}