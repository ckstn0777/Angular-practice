import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // 자신의 템플릿 중 템플릿 변수 가져오는 방법
  @ViewChild('f', {static: true}) signupForm: NgForm;
  defaultQuestion = 'pet';
  answer = '';
  genders = ['male', 'female'];
  user = {
    username: '',
    email: '',
    secret: '',
    answer: '',
    gender: ''
  }
  submitted = false;

  suggestUserName() {
    const suggestedName = 'Superuser';
    /* best한 방법이 아님. setValue방법. 모든 input이 overwrite됨. (전체 폼을 set할때 유용)
    this.signupForm.setValue({
      userData: {
        username: suggestedName,
        email: ''
      },
      secret: 'pet',
      questionAnswer: '',
      gender: 'male'
    });
    */
   // patchValue 방법. untouched된거는 제외? (부분적인 것만 set할때 유용)
   this.signupForm.form.patchValue({
    userData: {
      username: suggestedName,
      email: ''
    },
    secret: 'pet',
    questionAnswer: '',
    gender: 'male'
   });
  }

  onSubmit(form: NgForm) {
    // console.log(form);
    this.submitted = true;
    this.user.username = form.value.userData.username;
    console.log(form.value.userData.username);

    form.reset();
  }
}
