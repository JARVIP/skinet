import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IBasket, IbasketItem } from '../shared/models/basket';
import { BasketService } from './basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  basket$: Observable<IBasket>

  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
  }


  removeBasketItem(item: IbasketItem){
    this.basketService.removeItemFromBasket(item);
  }

  incrementItemQuantity(item: IbasketItem){
    this.basketService.incrementItemQuantity(item);
  }

  decrementItemQuantity(item: IbasketItem)
  {
    this.basketService.decrementItemQuantity(item);
  }

}
