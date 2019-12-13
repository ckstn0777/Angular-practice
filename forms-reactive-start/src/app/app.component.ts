import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';

// 1) 리액티브 폼(모델 기반 폼)은 템플릿이 아닌 컴포넌트 클래스에서 폼 요소의 상태를 관리하는 객체인 폼 모델을 구성하는 방식이다.
// 리액티브 폼은 템플릿 기반 폼보다 비교적 복잡한 경우 사용한다.
// 2) 리액티브 폼(모델 기반 폼)은 컴포넌트 클래스에서 폼 요소의 값 및 유효성 검증 상태를 관리하는
// 자바스크립트 객체인 폼 모델(FormGroup, FormControl, FormArray)을 직접 정의/생성한다.
// 그리고 form* 접두사가 붙은 디렉티브(formGroup, formGroupName, formControlName, formArrayName)를 사용하여 템플릿의 폼 요소와 컴포넌트 클래스의 폼 모델을 프로퍼티 바인딩으로 연결한다

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  genders = ['male', 'female'];
  // FormGroup 클래스가 생성하는 FormGroup 인스턴스는 자신의 자식인 FormControl 인스턴스 또는 FormArray 인스턴스들을 그룹화하여 관리하기 위한 최상위 컨테이너이다
  signupForm: FormGroup;
  forbiddenUsernames = ['Chris', 'Anna'];

  ngOnInit() {
    this.signupForm = new FormGroup({
      // FormControl 클래스가 생성하는 FormControl 인스턴스는 폼을 구성하는 기본 단위로서 폼 컨트롤 요소의 값이나 유효성 검증 상태를 추적하고 뷰와 폼 모델을 동기화된 상태로 유지한다.
      // FormControl에 추가된 검증기는 템플릿의 폼 컨트롤 요소의 상태가 변화할 때마다 호출된다.

      // FormGroup 인스턴스는 폼 요소 내부의 폼 컨트롤 요소들을 그룹화하기 위해 또다른 FormGroup 인스턴스를 가질 수 있다.
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmail),
      }),
      //'username': new FormControl(null, Validators.required),
      //'email': new FormControl(null, [Validators.required, Validators.email]),
      'gender': new FormControl('male'), //default로 male
      'hobbies': new FormArray([])
    });
    /*
    // value가 바뀔때마다 호출됨.
    this.signupForm.valueChanges.subscribe((value) => {
      console.log(value);
    });
    // status가 바뀔때마다 호출됨.
    this.signupForm.statusChanges.subscribe((status) => {
      console.log(status);
    });
    */

    // 초기값 설정(전체가 바뀜)
    this.signupForm.setValue({
      'userData': {
        'username': 'Max',
        'email': 'max@test.com'
      },
      'gender': 'male',
      'hobbies': []
    });

    // 일부만 바뀌도록 설정할 수 있음
    this.signupForm.patchValue({
      'userData': {
        'username': 'Anna'
      }
    });
  }

  onSubmit() {
    console.log(this.signupForm);
    this.signupForm.reset(); // 리셋.
  }

  // 취미 추가 버튼을 클릭하면 FormArray에 새 FormContorl을 생성해서 push해줌.
  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  // 반환형이 객체라니... 이런문법은 또처음이네
  // custom validators만들기. 금지유저이름을 지정해놓고 만약 금지유저이름을 쓰면 invalid되도록
  forbiddenNames(control: FormControl): {[s: string]: boolean} {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) { // 금지유저이름을 썼다면
      return {'nameIsForbidden': true}; // 에러메시지는 객체형태로 리턴
    }
    return null;
  }

  // 비동기 custom validator
  forbiddenEmail(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject)=> {
      setTimeout(()=> {
        if (control.value === 'test@test.com') {
          resolve({'emailIsForbidden': true});
        } else {
          resolve(null);
        }
      }, 1500);
    })
    return promise;
  }
}
