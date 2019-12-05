import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  user: {id: number, name: string};
  // paramSubscription: Subscription;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    // 초기 라우터 파라미터 가져올때
    this.user = {
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name']
    };

    // 이후에 라우터에 변화가 생길때 마다 업데이트 됨
    this.route.params
      .subscribe((params: Params) => {
        this.user.id = params['id'];
        this.user.name = params['name'];
      });
  }

  ngOnDestroy() {

  }

}
