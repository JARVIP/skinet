import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Basket, IBasket, IbasketItem, IBasketTotals } from '../shared/models/basket';
import { IDeliveryMethod } from '../shared/models/deliveryMethod';
import { IProduct } from '../shared/models/products';

@Injectable({
  providedIn: 'root'
})

export class BasketService {
  baseUrl = environment.apiUrl;
  private basketSoure = new BehaviorSubject<IBasket>(null);
  basket$ = this.basketSoure.asObservable();
  private basketTotalSoure = new BehaviorSubject<IBasketTotals>(null);
  basketTotal$ = this.basketTotalSoure.asObservable();
  shipping = 0;

  constructor(private http: HttpClient) { }

  setShippingPrice(deliveryMethod: IDeliveryMethod){
    this.shipping = deliveryMethod.price;
    this.calcilateTotals();
  }

  getBasket(id: string){
    return this.http.get(this.baseUrl + 'basket?id=' + id)
      .pipe(
        map((basket: IBasket) => {
          this.basketSoure.next(basket);
          this.calcilateTotals();
        })
      );
  }
  setBasket(basket: IBasket){
    return this.http.post(this.baseUrl + 'basket', basket).subscribe((response: IBasket)=>{
      this.basketSoure.next(response);
      this.calcilateTotals();
    }, error=>{
      console.log(error);
    })
  }

  getCurrentBasketValue(){
    return this.basketSoure.value;
  }

  addItemToBasket(item: IProduct, quantity = 1){
    const itemToAdd: IbasketItem = this.mapProductItemToBasketItem(item, quantity);
    const basket = this.getCurrentBasketValue() ?? this.createBasket();
    basket.items = this.addOrUpdateItem(basket.items, itemToAdd, quantity);
    this.setBasket(basket);
  }

  incrementItemQuantity(item: IbasketItem){
    const basket = this.getCurrentBasketValue();
    const foundItemIndex = basket.items.findIndex(x=>x.id === item.id);
    basket.items[foundItemIndex].quantity++;
    this.setBasket(basket);
  }

  decrementItemQuantity(item: IbasketItem){
    const basket = this.getCurrentBasketValue();
    const foundItemIndex = basket.items.findIndex(x=>x.id === item.id);
    if(basket.items[foundItemIndex].quantity > 0)
    {
      basket.items[foundItemIndex].quantity--;
    }else{
      this.removeItemFromBasket(item);
    }
    this.setBasket(basket);
  }

  removeItemFromBasket(item: IbasketItem) {
    const basket = this.getCurrentBasketValue();
    if(basket.items.some(x=>x.id === item.id))
    {
      basket.items = basket.items.filter(i=> i.id !== item.id);
      if(basket.items.length > 0){
        this.setBasket(basket);
      }else{
        this.deleteBasket(basket);
      }
    }
  }

  deleteLocalBasket(id: string){
    this.basketSoure.next(null);
    this.basketTotalSoure.next(null);
    localStorage.removeItem('basket_id');
  }

  deleteBasket(basket: IBasket) {
    return this.http.delete(this.baseUrl + 'basket?id='+basket.id).subscribe(()=>{
      this.basketSoure.next(null);
      this.basketTotalSoure.next(null);
      localStorage.removeItem('basket_id');
    }, error=>{
      console.log(error);
    })
  }

  private calcilateTotals(){
    const basket = this.getCurrentBasketValue();
    const shipping = this.shipping;
    const subtotal = basket.items.reduce((a,b) => (b.price * b.quantity) + a, 0);
    const total = subtotal + shipping;
    this.basketTotalSoure.next({shipping, total, subtotal});
  }

  private addOrUpdateItem(items: IbasketItem[], itemToAdd: IbasketItem, quantity: number): IbasketItem[] {
    const index = items.findIndex(i=>i.id === itemToAdd.id);
     if(index === -1){
       itemToAdd.quantity = quantity;
       items.push(itemToAdd);
     }else{
       items[index].quantity += quantity;
     }
     return items;
  }

  private createBasket(): IBasket {
    const basket = new Basket();
    localStorage.setItem('basket_id', basket.id);
    return basket;
  }

  private mapProductItemToBasketItem(item: IProduct, quantity: number): IbasketItem {
      return{
        id: item.id,
        productName: item.name,
        price: item.price,
        pictureUrl: item.pictureUrl,
        quantity,
        brand: item.productBrand,
        type: item.productType
      }
  }
}

