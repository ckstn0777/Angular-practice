// customer/customer.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { BlogHeaderComponent } from './header/blog-header.component';

@NgModule({
  imports: [
    CommonModule,
    /* 라우트 모듈의 등록 */
    HomeRoutingModule
  ],
  declarations: [
    HomeComponent,
    BlogHeaderComponent
  ],
  providers: [],
  exports: [HomeComponent] /* HomeComponent 공개 */
})
export class HomeModule {}
