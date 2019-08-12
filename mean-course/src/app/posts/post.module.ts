import { NgModule } from '@angular/core';
import { PostCreateComponent } from './post-create/post-create.component';
import { PostListComponent } from './post-list/post-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    PostCreateComponent,
    PostListComponent,
  ],
  imports: [
    CommonModule, // BrowserModule와 비슷한 역할을 하는 모듈. 구조지시자 사용가능하게 해줌
    ReactiveFormsModule, // PostModule이 사용하는 모듈
    AngularMaterialModule,
    RouterModule
  ]
})
export class PostModuel {}
