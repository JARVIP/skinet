import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IBrand } from '../shared/models/brand';
import { IProduct } from '../shared/models/products';
import { IType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/shopParams';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild('search', {static: false}) searchTerm: ElementRef;
  products: IProduct[];
  brands: IBrand[];
  types: IType[];
  shopParams = new ShopParams();
  totalCount: number;

  sortOptions = [
    {name : "Alphabetical", value: "Name"},
    {name : "Price: Low To Hight", value: "PriceAsc"},
    {name : "Price: Hight To Low", value: "PriceDesc"},
  ]

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.getProduts();
    this.getBrands();
    this.getTypes();
  }

  getProduts()
  {
    this.shopService.getProducts(this.shopParams).subscribe(response => {
      this.products = response.data;
      this.shopParams.pageNumber = response.pageIndex;
      this.shopParams.pageSize = response.pageSize;
      this.totalCount = response.count;
    }, error =>{
      console.log(error)
    });
  }

  getBrands(){
    this.shopService.getBrands().subscribe(response => {
      this.brands = [{ id: 0, name: 'All'}, ...response];
    }, error=>{
      console.log(error);
    });
  }

  getTypes(){
    this.shopService.getTypes().subscribe(response => {
      this.types = [{ id: 0, name: 'All'}, ...response] ;
    }, error=>{
      console.log(error);
    });
  }

  onBrandSelected(brandId: number)
  {
    this.shopParams.brandId = brandId;
    this.shopParams.pageNumber = 1;
    this.getProduts();
  }

  onTypeSelected(typeId: number)
  {
    this.shopParams.typeId = typeId;
    this.shopParams.pageNumber = 1;
    this.getProduts();
  }

  onSortSelected(sort: string)
  {
    this.shopParams.sort = sort;
    this.getProduts();
  }

  onPageChanged(event: any)
  {
    if(this.shopParams.pageNumber !== event){
      this.shopParams.pageNumber = event;
      this.getProduts();
    }
  }

  onSearch(){
    this.shopParams.search = this.searchTerm.nativeElement.value;
    this.shopParams.pageNumber = 1;
    this.getProduts();
  }

  onReset()
  {
    this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.getProduts();
  }
}
