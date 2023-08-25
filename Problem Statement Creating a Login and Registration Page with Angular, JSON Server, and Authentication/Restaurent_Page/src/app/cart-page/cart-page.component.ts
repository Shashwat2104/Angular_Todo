import { Component, OnInit } from '@angular/core';
import { MenuService } from '../menu.service';
@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent implements OnInit {
  data: any = [];
  sum = 0;
  constructor(private menuservice: MenuService) {}
  ngOnInit(): void {
    this.getcartDataall();
  }
  getcartDataall() {
    this.data = this.menuservice.getCartData();
  }
  increment(ele: any) {
    for (let i = 0; i < this.data.length; i++) {
      if (ele.idCategory === this.data[i].idCategory) {
        if (!this.data[i].originalPrice) {
          this.data[i].originalPrice = this.data[i].price;
        }
        this.data[i].quantity++;
        this.data[i].price = this.data[i].originalPrice * this.data[i].quantity;
      }
    }

    localStorage.setItem('cart', JSON.stringify(this.data));
  }
  decrement(ele: any) {
    for (let i = 0; i < this.data.length; i++) {
      if (ele.idCategory === this.data[i].idCategory) {
        if (this.data[i].quantity > 1) {
          if (!this.data[i].originalPrice) {
            this.data[i].originalPrice = this.data[i].price;
          }
          this.data[i].quantity--;
        }
        this.data[i].price = this.data[i].originalPrice * this.data[i].quantity;
      }
    }

    localStorage.setItem('cart', JSON.stringify(this.data));
  }
  deleteProduct(id: number) {
    for (let i = 0; i < this.data.length; i++) {
      if (id === this.data[i].idCategory) {
        this.data.splice(i, 1);
      }
    }

    localStorage.setItem('cart', JSON.stringify(this.data));
  }
}
