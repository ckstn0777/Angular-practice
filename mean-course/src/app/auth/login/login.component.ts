import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoding = false;
  private authStatusSub: Subscription;

  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        this.isLoding = false;
      }
    );
  }

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoding = true; // 로그인 완료되면 메인으로 네비게이션 되기때문에 굳이 false로 바꿔줄 필요없음
    this.authService.login(form.value.email, form.value.password);
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
