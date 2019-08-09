// app-routing.module.ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './blog/login/login.component';
// 라우트 구성
const routes: Routes = [
  { path: '', redirectTo: '/home',  pathMatch: 'full' },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  /* 모든 라우트 구성을 포함한 모듈을 생성하고 라우팅 모듈에 추가 */
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
