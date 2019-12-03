import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  // 자식은 부모가 넘겨준 recipe 데이터를 입력받음
  @Input() recipe: Recipe;

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {

  }

  onSelected() {
    // 서비스에 EventEmitter를 구현한것을 호출해서 emit 시킴. (= 이벤트 발생시킴)
    // recipes.component.ts에서 subscribe해서 이벤트를 처리함.
    this.recipeService.recipeSelected.emit(this.recipe);
  }

}
