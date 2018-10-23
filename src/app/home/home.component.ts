import { Component, OnInit, Output } from '@angular/core';
import {ArserviceService} from 'src/app/arservice.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  pageTitle:'Articles';
  imageWidth: number=30;
  imageMargin:number=2;
  articles:any=[];
  errorMessage='';
  constructor(private articleservice:ArserviceService) { }

  onClickFavourite(){
      if(!this.articles.favorited)
      {
        this.articles.favoritesCount++;
      } else {
        this.articles.favoritesCount--;
      }
    }
  ngOnInit() {
    this.articleservice.getArticles().subscribe(
      data=>{
      this.articles=(Object.values(data));
      },
      error=>this.errorMessage=<any>error
    );
  }

}
