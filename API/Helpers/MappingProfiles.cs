using API.Dtos;
using AutoMapper;
using Core.Entities;
using Core.Entities.Identity;
using Core.Entities.OrderAggregate;

namespace API.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Product, ProductToReturnDTO>()
                .ForMember(d => d.ProductBrand, o => o.MapFrom(src => src.ProductBrand.Name))
                .ForMember(d => d.ProductType, o => o.MapFrom(src => src.ProductType.Name))
                .ForMember(d=> d.PictureUrl, o => o.MapFrom<ProductUrlResolver>());

            CreateMap<Address, AddressDTO>().ReverseMap();
            CreateMap<CustomerBasketDTO, CustomerBasket>().ReverseMap();
            CreateMap<BasketItemDTO, BasketItem>().ReverseMap();
            CreateMap<AddressDTO,OrderAddress>().ReverseMap();
            CreateMap<Order, OrderToReturnDTO>()
                .ForMember(d => d.DelivaryMethod, o => o.MapFrom(src => src.DelivaryMethod.ShortName))
                .ForMember(d => d.ShippingPrice, o => o.MapFrom(src => src.DelivaryMethod.Price));
            CreateMap<OrderItem, OrderItemDTO>()
                .ForMember(d => d.ProductId, o => o.MapFrom(src => src.ItemOrdered.ProductItemId))
                .ForMember(d => d.ProductName, o => o.MapFrom(src => src.ItemOrdered.ProductName))
                .ForMember(d => d.PictureUrl, o => o.MapFrom(src => src.ItemOrdered.PictureUrl))
                .ForMember(d => d.PictureUrl, o => o.MapFrom<OrderItemUrlRespolver>());           
        }
    }
}