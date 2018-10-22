import { Injectable } from '@angular/core';
import {HttpClient,HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import {catchError,tap, map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ArserviceService {

  private getarticleUrl='https://conduit.productionready.io/api/articles'
  constructor(private http:HttpClient) { }
  getArticles():Observable<any>{
    return this.http.get<any>(this.getarticleUrl).pipe(
      tap(data=>console.log('All:'+JSON.stringify(data))),
      catchError(this.handleError)
    );
  }
  getArticle(slug:string):Observable<any>{
    console.log(slug)
    return this.http.get(`${this.getarticleUrl}/${slug}`
    );
  }

  addArticle(title:string, description:string, content:string, tags?:string)
  {
    const headers=new HttpHeaders({"Content-Type": "application/json", "Authorization": "Token " +
    localStorage.jwtToken});
    return this.http.post<any>(`${this.getarticleUrl}`,
    {"article":{title:title,description:description,body:content,tagList:tags}},{
    headers:headers}).pipe(map(article=>{
      return article.article;
    }));
  }
  
    private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
