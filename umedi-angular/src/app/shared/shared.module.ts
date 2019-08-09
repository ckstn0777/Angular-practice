// shared/shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogHeaderComponent } from './header/blog-header.component';
import { BlogFooterComponent } from './footer/blog.footer.component';
import { TranslateModule } from '@ngx-translate/core';
import { HomeRoutingModule } from '../blog/home/home-routing.module';

@NgModule({
  imports: [CommonModule, TranslateModule, HomeRoutingModule],
  declarations: [BlogFooterComponent, BlogHeaderComponent],
  providers: [],
  exports: [BlogFooterComponent, BlogHeaderComponent, TranslateModule]
})
export class SharedModule {}
