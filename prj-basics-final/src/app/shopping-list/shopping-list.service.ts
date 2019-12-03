import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {
  ingredientChanged = new EventEmitter<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  getIngredients() {
    // this.ingredients.slice를 하면 이 배열을 copy한 것을 리턴해줌
    // 그래서 우리가 push를 해줘도 오리지널값만 리턴해줌?? -> 변화가 없다...
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);

    // EventEmitter로 배열에 변화가 발생했다면 이벤트를 발생시킴. 추가된 새 값을 넘겨줌
    this.ingredientChanged.emit(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    /*
    for (let ingredient of ingredients) {
      this.addIngredient(ingredient);
    }
    */
   // 그냥 push를 하면 ingredients배열안에 또 배열이 들어가는 셈...
   // 이래서는 안되고 하나씩 추가해줘야 할텐데 가장 쉬운방법이 아래처럼 하는것.
    this.ingredients.push(...ingredients);
    this.ingredientChanged.emit(this.ingredients.slice());
  }
}
