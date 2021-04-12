using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
    public class LoginDTO
    {
        [Required]
        public string Email { get; set; }
        
        [Required]
        public string Password { get; set; }
    }
}