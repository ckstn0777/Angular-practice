import { Directive, HostListener, HostBinding } from '@angular/core';
@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  // @HostBinding은 지정된 속성 값이 바뀌면 해당 element를 업데이트해주는 역할을 한다.
  // 디렉티브는 내부 프로퍼티를 host element 에 있는 input 프로퍼티에 연결할 수 있다. 그래서 내부 프로퍼티가 변경되면 host element에 있는 input 프로퍼티도 변경될 거다.

  // 그니까 이해하기 힘든데... isOpen이 true면 class에 open을 추가하고, false면 추가하지 않겠다 이소리 아님??
  @HostBinding('class.open') isOpen = false;

  // 사용자 정의 어트리뷰트 디렉티브에서 이벤트를 처리. 따라서 클릭이벤트가 발생하면 toggleOpen함수가 실행됨
  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;
  }
}
