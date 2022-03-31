import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, Subject} from "rxjs";

import {Post} from "./post.model";
import * as url from "url";
import {response} from "express";
import {Router} from "@angular/router";

@Injectable({providedIn: "root"})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();
  private apiLink = 'http://localhost:3000/api/posts';

  constructor(private http: HttpClient, private router: Router) {
  }

  getPosts(): Post[] {
    this.http
      .get<{ message: string; posts: any }>(
        this.apiLink
      )
      .pipe(map((postsData) => {
        return postsData.posts.map(post => {
          return {
            title: post.title,
            content: post.content,
            id: post._id
          }
        });
      }))
      .subscribe(transformedPosts => {
        this.posts = transformedPosts;
        this.postsUpdated.next([...this.posts]);
      });
    return this.posts;
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = {id: '', title: title, content: content};
    this.http
      .post<{ message: string, postId: string }>(this.apiLink, post)
      .subscribe(responseData => {
        post.id = responseData.postId;
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
        this.navigateHome();
      });
  }

  deletePost(id: string) {
    this.http.delete(this.apiLink + "/" + id)
      .subscribe(() => {
        this.posts = this.posts.filter(post => post.id != id);
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPost(id: string) {
    return this.http.get<{ _id: string, title: string, content: string }>(this.apiLink + "/" + id);
  }

  updatePost(id: string, title: string, content: string) {
    const post: Post = {id: id, title: title, content: content};
    this.http.put(this.apiLink + "/" + id, post)
      .subscribe(response => {
        const updatedPosts = [...this.posts];
        const oldPostIndex = updatedPosts.findIndex(p => p.id === post.id);
        updatedPosts[oldPostIndex] = post;
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
        this.navigateHome();
      });
  }

  private navigateHome(){
    this.router.navigate(["/"]);
  }
}
