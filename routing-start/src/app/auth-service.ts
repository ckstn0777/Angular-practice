export class AuthService {
  loggedIn = false;

  // 인증 여부를 프라미스 형태로 반환. 지연시간을 고려해서 0.8초 후에.
  isAuthenticated() {
    const promise = new Promise(
      (resolve, reject) => {
        setTimeout(() => {
          resolve(this.loggedIn);
        }, 800);
      });
      return promise;
  }
  login() {
    this.loggedIn = true;
  }
  logout() {
    this.loggedIn = false;
  }
}
