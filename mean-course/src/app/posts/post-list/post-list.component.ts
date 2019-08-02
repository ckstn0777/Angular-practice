import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component ({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  private postsSub: Subscription;
  constructor(public postsService: PostsService) {}

  ngOnInit() {
    this.postsService.getPosts(); // 방송국 생성, 데이터 생성
    this.postsSub = this.postsService.getPostUpdateListener()
    .subscribe((posts: Post[]) => { // 구독자 생성후 방송국의 데이터를 전송받음
      this.posts = posts;
    });
  }

  onDelete(postId: string) {
    this.postsService.deletePost(postId);
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
