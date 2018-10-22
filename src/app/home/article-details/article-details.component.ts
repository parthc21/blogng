import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { ArserviceService } from 'src/app/arservice.service';
import {CommentsService} from 'src/app/comments.service';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/authentication.service';
import { Observable } from 'rxjs';
import {UserService} from 'src/app/user.service';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css']
})
export class ArticleDetailsComponent implements OnInit {

  commentForm:FormGroup;
  pageTitle='Article Details'
  article:any;
  imageWidth: number=30;
  imageMargin:number=2;
  slug:string;
  currentUser:any;
  comments:any;
  isLoggedIn:Observable<boolean>
  constructor(private route:ActivatedRoute,
    private articleService:ArserviceService,
    private commentService:CommentsService,
    private authenticationService: AuthenticationService,
    private userService:UserService,
    private formBuilder:FormBuilder) {
      this.isLoggedIn=authenticationService.isLoggedIn();
    }

  ngOnInit() {
    this.commentForm = this.formBuilder.group({
      comment: ['', Validators.required]
});
    this.route.queryParams.subscribe(params=> {this.slug = params['slug'];
    });
    this.articleService.getArticle(this.slug).subscribe((data:any)=>
      this.article = data.article
      );
    this.commentService.getComments(this.slug).subscribe((data:any)=>{
    this.comments=data.comments;});

    this.userService.getUserByToken().pipe(first()).subscribe((data:any)=>{
      this.currentUser=data.user;
    });
    }
    get f(){ return this.commentForm.controls;}
    
    onSubmit(){
      this.commentService.addComment(this.f.comment.value,this.slug).pipe(first()).subscribe((data)=>{window.location.reload();});
    }
    deleteComment(id:number,username:string){
      this.commentService.deleteComment(this.slug,id).pipe(first()).subscribe(data=>{window.location.reload();})
    }
}

