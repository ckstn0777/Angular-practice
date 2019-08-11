import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class PostsService {
    private posts: Post[] = [];
    private postsUpdated = new Subject<Post[]>();

    constructor(private http: HttpClient, private router: Router) {}

    // 게시글 불러오기
    getPosts(postsPerPage: number, currentPage: number) {
      const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
      this.http.get<{message: string, posts: Post[]}>('http://localhost:3000/api/posts' + queryParams)
        .pipe(map((postData) => {
          return postData.posts.map(post => {
            return {
              title: post.title,
              content: post.content,
              id: post.id,
              imagePath : post.imagePath,
              creator: post.creator
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

    getPost(id: string) {
      return this.http.get<{id: string, title: string, content: string, imagePath: string, creator: string}>('http://localhost:3000/api/posts/' + id);
    }

    addPost(title: string, content: string, image: File) {
      const postDate = new FormData();
      postDate.append("title", title);
      postDate.append("content", content);
      postDate.append("image", image, title);

      this.http.post<{message: string, post: Post}>('http://localhost:3000/api/posts', postDate)
        .subscribe((responseData) => {
            console.log(responseData);

            const post: Post = {
              id: null,
              title: responseData.post[0],
              content: responseData.post[1],
              imagePath: responseData.post[2],
              creator: null
            };
            this.posts.push(post);

            this.postsUpdated.next(this.posts);
            this.router.navigate(['/']);
        });
  }
    updatePost(id: string, title: string, content: string, image: File | string) {
      console.log('update');
      let postData: Post | FormData;
      // 이미지 객체인 경우 -> form 형식 전달
      if(typeof(image) === 'object') {
        postData = new FormData();
        postData.append("id", id);
        postData.append("title", title);
        postData.append("content", content);
        postData.append("image", image);
      }
      else{ // 이미지 경로인 경우 -> json형식 전달
        postData = {id: id, title: title, content: content, imagePath: image, creator: null};
      }
      this.http.put<{message: string, imagePath: string}>('http://localhost:3000/api/posts/' + id, postData)
          .subscribe((responseData) => {
              const updatePosts = [...this.posts];
              const oldPostIndex = updatePosts.findIndex(p => p.id == id);
              const post: Post = {id: id, title: title, content: content, imagePath: responseData.imagePath, creator: null}
              updatePosts[oldPostIndex] = post;
              this.posts = updatePosts;
              this.postsUpdated.next([...this.posts]);
              this.router.navigate(['/']);
              // console.log(responseData.message);
              // this.postsUpdated.next(this.posts);
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
