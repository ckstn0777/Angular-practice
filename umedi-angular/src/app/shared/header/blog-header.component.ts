import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-blog-header',
  templateUrl: './blog-header.component.html',
  styleUrls: ['./blog-header.component.css'],
})

export class BlogHeaderComponent {
  private translate: TranslateService;

  constructor(translate: TranslateService) {
    this.translate = translate;
  }

  // 언어 변경
  switchLanguage(lang: string): void {
    this.translate.use(lang);
    console.log(lang);
  }
}
