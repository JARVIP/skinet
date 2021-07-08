using System;
using System.Collections.Generic;

namespace Core.Entities.OrderAggregate
{
    public class Order : BaseEntity
    {
        public Order(){}
        public Order(
            IReadOnlyList<OrderItem> orderItems,
            string buyerEmail,
            OrderAddress shipTOAddress,
            DeliveryMethod delivaryMethod, 
            decimal subtotal)
        {
            BuyerEmail = buyerEmail;
            ShipToAddress = shipTOAddress;
            DelivaryMethod = delivaryMethod;
            OrderItems = orderItems;
            Subtotal = subtotal;
        }

        public string BuyerEmail {get;set;}

        public DateTimeOffset OrderDate { get; set; } = DateTimeOffset.Now;

        public OrderAddress ShipToAddress {get;set;}

        public DeliveryMethod DelivaryMethod { get; set; }

        public IReadOnlyList<OrderItem> OrderItems { get; set; }

        public decimal Subtotal { get; set; }

        public OrderStatus Status { get; set; } = OrderStatus.Pending;

        public string PaymentIntentId  {get;set;}

        public decimal GetTotal()
        {
            return Subtotal + DelivaryMethod.Price;
        }
    }
}