import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { PageEvent } from '@angular/material';
import { AuthService } from 'src/app/auth/auth.service';

@Component ({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  isLoding = false;
  totalPosts = 10;
  postsPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  userIsAuthenticated = false;
  userId: string;
  private postsSub: Subscription;
  private authStatusSub: Subscription;

  constructor(public postsService: PostsService, private authService: AuthService) {}

  onChangePage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postsService.getPosts(this.postsPerPage, this.currentPage); // 방송국 생성, 데이터 생성
  }

  ngOnInit() {
    this.postsService.getPosts(this.postsPerPage, this.currentPage); // 방송국 생성, 데이터 생성
    this.isLoding = true;
    this.userId = this.authService.getUserId();
    this.postsSub = this.postsService.getPostUpdateListener()
    .subscribe((posts: Post[]) => { // 구독자 생성후 방송국의 데이터를 전송받음
      this.isLoding = false;
      this.posts = posts;
    });
    this.userIsAuthenticated = this.authService.getIsAuth();
    // console.log('1', this.userIsAuthenticated);

    // 이건 안된다는거네. 왜 안되는지 모른다면 cold, hot observable에 대해 공부하고 오시길.
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      // console.log('2', isAuthenticated);
      this.userId = this.authService.getUserId();
      this.userIsAuthenticated = isAuthenticated;
    });
  }

  onDelete(postId: string) {
    this.postsService.deletePost(postId);
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
