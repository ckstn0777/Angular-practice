// Resolve는 각 Route의 뷰가 실행되기 전에 뷰에서 필요한 데이터를 미리 로딩할 때 쓰는 가드입니다.
// 뷰가 화면에 렌더링되기 전에 반드시 응답을 받아야 하는 데이터가 있을 때 사용합니다.

import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { ServersService } from "../servers.service";
import { Injectable } from "@angular/core";

interface Server {
  id: number;
  name: string;
  status: string;
}

@Injectable()
export class ServerResolver implements Resolve<{id: number, name: string, status: string}> {
  constructor(private serversService: ServersService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Server> | Promise<Server> | Server {
    return this.serversService.getServer(route.params['id']); // 라우터를 이용해 데이터 전달하기
  }
}
