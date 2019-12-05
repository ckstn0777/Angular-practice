// 보통은 이렇게 라우팅 모듈로써 불리한다.

import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { UsersComponent } from "./users/users.component";
import { UserComponent } from "./users/user/user.component";
import { ServersComponent } from "./servers/servers.component";
import { ServerComponent } from "./servers/server/server.component";
import { EditServerComponent } from "./servers/edit-server/edit-server.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { AuthGuard } from "./auth-guard.service";
import { CanDeactivateGuard } from "./servers/edit-server/can-deactivate-guard.service";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { ServerResolver } from "./servers/server/server-resolver.service";

const appRoutes: Routes = [
  {
    path: '', // http://localhost/ 일때 HomeComponent 호출
    component: HomeComponent
  },
  {
    path: 'users', // http://localhost/users 일때 UsersComponent 호출
    component: UsersComponent,
    children: [
      {
        path: ':id/:name', // http://localhost/users/(userid)/(username) 일때 UserComponent 호출
        component: UserComponent
      },
    ]
  },
  {
    path: 'servers', // http://localhost/servers 일때 ServersComponent 호출
    // canActivate: [AuthGuard], // 로그인 여부 판단해서 true면 가능. false면 접속불가능
    canActivateChild: [AuthGuard], // servers는 접근가능하지만 자식경로들은 접근여부를 판단하겠다!!
    component: ServersComponent,
    children: [ // children은 top level router가 아님. nested 해야한다. 즉, ServersComponent html에서 router-outlet을 써줘야한다는 뜻.
      {
        path: ':id', // http://localhost/servers/(serverid) 일때 ServerComponent 호출
        component: ServerComponent,
        resolve: {server: ServerResolver} // 라우터를 이용해 동적 데이터 전달
      },
      {
        path: ':id/edit', // http://localhost/servers/(serverid)/edit 일때 EditServerComponent 호출
        canDeactivate: [CanDeactivateGuard], // 현재 라우트로 매칭되어 노출되고 있는 뷰에서 다른 뷰로 전환하기 전에 마지막으로 실행됩니다.
        component: EditServerComponent
      }
    ]
  },
  {
    path: '**', // 상위 정해진 라우터 경로 말고 모든 경로는 여기에 해당됨. 페이지 찾을 수 없음 표시. 가장 하위에 적어주어야 한다.
    // component: PageNotFoundComponent
    component: ErrorPageComponent,
    data: {message: 'Page not found!'} // static data
  }
  // redirectTo : 해당 path는 redirectTo를 통해 다른 경로로 redirect된다.
  // pathMatch: 'full' (경로가 완벽히 일치할때 해당됨)
]

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}

/*
  헷갈리는 용어...!
  Routes, RouterModule => 라우터 설정할 때 사용된다고 보면 됨
  ActivatedRoute => 현재활성화된 컴포넌트 라우터 상태 정보를 제공하는 클래스입니다.
  Router => 뷰의 전환, URL과 관련된 여러 기능을 제공하는 클래스입니다. 주로 뷰의 전환이 필요할 때 많이 사용
*/
