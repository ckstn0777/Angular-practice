import { Observable } from "rxjs";
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean; // 인터페이스 메소드(아직 구현안됨)
}

// CanDeactivate 가드는 화면을 떠날 때 호출됩니다. 현재 Route로 매칭되어 노출되고 있는 뷰에서 다른 뷰로 전환하기 전에 실행됩니다.
// 컴포넌트 생명 주기 중 OnDestory와 유사하다고 볼 수 있습니다.
export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
  // 상속받은 클래스에서 인터페이스 메소드 구현
  canDeactivate(component: CanComponentDeactivate, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot)
    : Observable<boolean> | Promise<boolean> | boolean {
      return component.canDeactivate();
      // 컴포넌트에 canDeactiveate호출. 여기서 컴포넌트란 edit-server.component.ts에서 구현된 canDeactivate를 의미한다. 여기서 이게 true면
      // 이동하고, 아니면 그대로 있고? 개어렵네;;
  }
}
