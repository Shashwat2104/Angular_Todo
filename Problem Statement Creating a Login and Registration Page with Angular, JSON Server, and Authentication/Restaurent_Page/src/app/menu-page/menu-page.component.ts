import { categories } from './../menu-interface';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MenuService } from '../menu.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.css'],
})
export class MenuPageComponent implements OnInit {
  arr: any[] = JSON.parse(localStorage.getItem('cart') || '[]');

  Foods: categories[] = [];
  filtereditems: any = [];
  constructor(
    private cdr: ChangeDetectorRef,
    private menuservice: MenuService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.getAllMenus();
    this.filtereditems = this.Foods;
    this.filterItem();
  }

  //get alldata from service
  getAllMenus() {
    this.menuservice.listMenu().subscribe((food) => {
      this.Foods = food.categories;
      this.filterItem();
    });
  }

  //add to cart logic
  AddToCart(ele: any) {
    for (let i = 0; i < this.arr.length; i++) {
      if (ele.idCategory == this.Foods[i].idCategory) {
        alert('product Already In The Cart');
        return;
      }
    }
    let random = Math.floor(Math.random() * 100);
    this.arr.push({ ...ele, quantity: 1, price: random });
    localStorage.setItem('cart', JSON.stringify(this.arr));
    alert('Product Added to Cart');
  }
  //for button
  redirectToCart() {
    this.route.navigate(['cart-page']);
  }

  //filter by category
  selectedFood: string = 'alldata';

  filterItem() {
    this.getAllMenus();

    if (this.selectedFood === 'alldata') {
      this.filtereditems = this.Foods;
      console.log(this.filtereditems);
    } else {
      this.filtereditems = this.Foods.filter((ele) => {
        return ele.strCategory === this.selectedFood;
      });
      console.log(this.filtereditems);
    }
  }
  logData() {
    console.log('Selected Food:', this.selectedFood);
    console.log('Filtered Items:', this.filtereditems);
  }
}
