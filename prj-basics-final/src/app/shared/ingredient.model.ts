export class Ingredient {
  /* FM 방법
  public name: string;
  public amount: number;

  constructor(name: string, amount: number) {
    this.name = name;
    this.amount = amount;
  }
  */

  // 이런식으로 생성자 안에 public 선언으로 바로 대입가능
  constructor(public name: string, public amount: number) {

  }
}
