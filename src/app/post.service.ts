import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";



@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private http: HttpClient) { }

  getPosts(){
    this.http.get('http://localhost:3000/api/posts').subscribe((postData)=>{
      console.log(postData);
    });
  }
}
