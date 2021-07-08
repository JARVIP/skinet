namespace API.Dtos
{
    public class OrderDTO
    {
        public string BasketId {get;set;}

        public int DeliveryMethodId { get; set; }

        public AddressDTO ShipToaddress { get; set; }
    }
}