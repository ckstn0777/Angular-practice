import { Component } from '@angular/core';

@Component({
  selector: 'app-blog-home',
  template: `
  <app-blog-header></app-blog-header>
  <app-blog-slider></app-blog-slider>
  <app-blog-search></app-blog-search>
  <app-blog-recommend></app-blog-recommend>
  <app-blog-footer></app-blog-footer>
  `
})
export class HomeComponent {

}
