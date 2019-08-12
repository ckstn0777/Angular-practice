import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.module';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

const BACKED_URL = environment.apiUrl + '/user/'; // 전역 변수,설정값을 environment에 저장

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private userId: string;
  private authoStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getAuthStatusListener() {
    return this.authoStatusListener.asObservable();
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getUserId() {
    return this.userId;
  }

  createUser(email: string, password: string) {
    const authData: AuthData = {email: email, password: password};
    return this.http.post(BACKED_URL + '/signup', authData)
      .subscribe(() => { // 회원가입 성공적이면
        this.router.navigate(['/']);
      }, error => { // 회원가입 시 서버에서 에러가 발생해서 에러를 넘겨받으면
        this.authoStatusListener.next(false);
      });
  }

  // 처음 화면 로딩할때 실행되는 함수
  autoAuthUser() {
    // 로컬 저장소에 저장되어있는 정보를 불러와서
    const authInformaiton = this.getAuthData();
    if (!authInformaiton) {
      return;
    }
    // 토큰 유효성 검사
    const now = new Date();
    const expiresIn = authInformaiton.expirationDate.getTime() - now.getTime(); // 남은시간
    console.log(expiresIn);
    if (expiresIn > 0) {
      this.token = authInformaiton.token;
      this.isAuthenticated = true;
      this.userId = authInformaiton.userId;
      this.setAuthTimer(expiresIn / 1000); // 밀리초를 초단위로 변환
      this.authoStatusListener.next(true);
    }
  }

  login(email: string, password: string) {
    const authData: AuthData = {email: email, password: password};
    this.http.post<{token: string, expiresIn: number, userId: string}>(BACKED_URL + '/login', authData)
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if (token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          // 토큰 유효시간이 되면 로그아웃되도록. 이걸안해주면 토큰 만료가 되었지만, 사용자 입장에서는 모르거든
          // 토큰은 메모리에만 저장되기때문에 reload하면 로그아웃 되버리는 문제가 발생...
          /* this.tokenTimer = setTimeout(() => {
            this.logout();
          }, expiresInDuration * 1000);
          */
          this.userId = response.userId;
          this.isAuthenticated = true;
          this.authoStatusListener.next(true);

          // local storage는 브라우저가 관리하는 저장소. 거기다가 저장해줘야...함
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          console.log(expirationDate);
          this.saveAuthData(token, expirationDate, this.userId);
          this.router.navigate(['/']);
        }
      }, error => { // 로그인 에러시
        this.authoStatusListener.next(false);
      });
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authoStatusListener.next(false);
    this.userId = null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  // 시간 타이머 설정
  private setAuthTimer(duration: number) {
    console.log("Setting timer: " + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  // 로컬저장소에 저장하는 메소드
  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toString());
    localStorage.setItem('userId', userId);
  }

  // 로컬저장소에 삭제하는 메소드
  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  }

  // 로컬저장소에 저장한걸 불러오는 메소드
  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const userId = localStorage.getItem("userId");
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId
    }
  }
}
