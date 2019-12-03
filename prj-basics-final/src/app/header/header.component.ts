import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  // 자식이 부모에게 데이터 전달 시 사용. 부모 html에서는 featureSelected에 대한 이벤트를 처리해줘야 함
  @Output() featureSelected = new EventEmitter<string>();

  //  헤더에 Recipe버튼이나 Shopping List버튼 클릭시 이벤트를 발생
  onSelect(feature: string) {
    this.featureSelected.emit(feature);
  }
}
