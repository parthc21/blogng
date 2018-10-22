import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import { ArserviceService } from '../arservice.service'
import {first} from 'rxjs/operators'
@Component({
  selector: 'app-newarticle',
  templateUrl: './newarticle.component.html',
  styleUrls: ['./newarticle.component.css']
})
export class NewarticleComponent implements OnInit {

  articleForm: FormGroup;
  loading = false;
  submitted = false;
  constructor(
    private activatedRoute : ActivatedRoute,
    private formbuilder: FormBuilder,
    private postArticle: ArserviceService,
    private router: Router
  ) { }

  ngOnInit() {
    this.articleForm = this.formbuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      content: ['', Validators.required],
      tags: ['']
    });
  }

  get f() {return this.articleForm.controls;}

  onSubmit(){
    this.submitted=true;
    this.loading=true;
    this.postArticle.addArticle(this.f.title.value,this.f.description.value,
                      this.f.content.value,this.f.tags.value).pipe(first())
                      .subscribe(
                        data=>{
                          this.router.navigateByUrl('/homepage');
                        },
                      );
  }

}
