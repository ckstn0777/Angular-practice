// customer/customer.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';

// 컴포넌트
import { BlogSliderComponent } from './slider/blog-slider.component';
import { BlogSearchComponent } from './search/blog-search.component';
import { BlogRecommendComponent } from './recommend/blog-recommend.component';

// material 모듈
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule, MatInputModule, MatTabsModule, MatCardModule, MatButtonModule } from '@angular/material';

// 공유 모듈
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    /* 라우트 모듈의 등록 */
    HomeRoutingModule,
    SharedModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatCardModule,
    MatButtonModule
  ],
  declarations: [
    HomeComponent,
    BlogSliderComponent,
    BlogSearchComponent,
    BlogRecommendComponent,
  ],
  providers: [],
  exports: [HomeComponent] /* HomeComponent 공개 */
})
export class HomeModule {}
