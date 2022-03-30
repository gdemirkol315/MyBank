import {Component, OnInit} from "@angular/core";
import {NgForm} from "@angular/forms";

import {PostsService} from "../posts.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.css"]
})
export class PostCreateComponent implements OnInit {
  enteredTitle = "";
  enteredContent = "";

  constructor(public postsService: PostsService, public route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe();
  }

  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.postsService.addPost(form.value.title, form.value.content);
    form.resetForm();
  }
}
