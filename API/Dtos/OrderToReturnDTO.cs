using System;
using System.Collections.Generic;
using Core.Entities.OrderAggregate;

namespace API.Dtos
{
    public class OrderToReturnDTO
    {
        public int Id { get; set; }
        public string BuyerEmail {get;set;}

        public DateTimeOffset OrderDate { get; set; }

        public OrderAddress ShipToAddress {get;set;}

        public string DelivaryMethod { get; set; }

        public decimal ShippingPrice {get;set;}

        public IReadOnlyList<OrderItemDTO> OrderItems { get; set; }

        public decimal Subtotal { get; set; }

        public string Status { get; set; } 

        public decimal Total {get;set;}

    }
}