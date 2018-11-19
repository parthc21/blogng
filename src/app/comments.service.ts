import { Injectable } from '@angular/core';
import{HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  url = 'https://conduit.productionready.io/api/';
  constructor(private http: HttpClient) { }
  getComments(slug: string) {
    return this.http.get(`${this.url}/articles/${slug}/comments`);
}
  addComment(comment:string,slug:string){
    const headers=new HttpHeaders({"Content-Type":"application/json","Authorization": "Token "+localStorage.jwtToken});
    return this.http.post<any>(`${this.url}/articles/${slug}/comments`,
    {"comment":{body:comment}},{
      headers:headers
    });
  }
  deleteComment(slug:string,id:number){
    const headers=new HttpHeaders({"Content-Type":"application/json","Authorization":"Token "+localStorage.jwtToken});
    return this.http.delete(`${this.url}articles/${slug}/comments/${id}`,{headers:headers});
  }
}
