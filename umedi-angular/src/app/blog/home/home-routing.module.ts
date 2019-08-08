import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';


/* 기능 모듈 단위 라우팅 구성 */
const routes: Routes = [{
  path: 'home',
  component: HomeComponent,
  /*children: [
    { path: ':id', component: UserDetailComponent }
  ]*/
}];

@NgModule({
  /* 기능 모듈 단위 라우터 등록  */
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class HomeRoutingModule {}
