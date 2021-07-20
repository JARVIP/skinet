import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasket, IbasketItem } from '../../models/basket';

@Component({
  selector: 'app-basket-summary',
  templateUrl: './basket-summary.component.html',
  styleUrls: ['./basket-summary.component.scss']
})
export class BasketSummaryComponent implements OnInit {
  basket$: Observable<IBasket>;
  @Input() isBasket = true;
  @Output() decrement: EventEmitter<IbasketItem> = new EventEmitter<IbasketItem>();
  @Output() increment: EventEmitter<IbasketItem> = new EventEmitter<IbasketItem>();
  @Output() remove: EventEmitter<IbasketItem> = new EventEmitter<IbasketItem>();

  constructor(private basketService: BasketService) {
    this.basket$ = this.basketService.basket$;
  }

  ngOnInit(): void {
  }

  decrementItemQuantity(item: IbasketItem)
  {
    this.decrement.emit(item);
  }

  incrementItemQuantity(item: IbasketItem)
  {
    this.increment.emit(item);
  }

  removeBasketItem(item: IbasketItem)
  {
    this.remove.emit(item);
  }
}
