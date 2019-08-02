import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class PostsService {
    private posts: Post[] = [];
    private postsUpdated = new Subject<Post[]>();

    constructor(private http: HttpClient) {}

    getPosts() {
      this.http.get<{message: string, posts: Post[]}>('http://localhost:3000/api/posts')
        .pipe(map((postData) => {
          return postData.posts.map(post => {
            return {
              title: post.title,
              content: post.content,
              id: post.id
            };
          });
        }))
        .subscribe((transformedPosts) => { // 방송국이라고 보면 됨.
          this.posts = transformedPosts;
          this.postsUpdated.next(this.posts); // 방송국이 제공하는 데이터
        });
    }

    getPostUpdateListener() {
      return this.postsUpdated.asObservable(); // 구독신청. 구독자 생성
    }

    addPost(title: string, content: string) {
        const post: Post = { id: null, title: title, content: content};
        this.http.post<{message: string}>('http://localhost:3000/api/posts', post)
          .subscribe((responseData) => {
              console.log(responseData.message);
              this.posts.push(post);
              this.postsUpdated.next(this.posts);
          });
    }

    deletePost(postId: string) {
      this.http.delete<{message: string}>('http://localhost:3000/api/posts/' + postId)
        .subscribe((responseData) => {
          console.log(responseData.message);
          const updatedPosts = this.posts.filter(post => post.id !== postId);
          this.posts = updatedPosts;
          this.postsUpdated.next(this.posts);
        });
    }
}
