import { Injectable, Component } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material';
import {DialogComponent} from '../app/dialog/dialog.component'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  news = [];
  path = 'http://localhost:3000';
  path2 = 'http://127.0.0.1:5000';
  fake = '';
  newsResponse : any;

  constructor(private http: HttpClient, public dialog: MatDialog) { }


  getNews() {
    this.http.get<any>(this.path + '/posts/').subscribe(res => {
        this.news = res
    })
  }

  // getFakeNews(news){
  //   this.http.get<any>(this.path2 + '/checknews/' + news).subscribe(res => {
  //     console.log("dsds", res);
  //     this.fake = res;
  //     news.fakeValue = this.fake;
  //     return this.postNews(news);
  //   })
  // }

   postNews(news) {

    this.http.post(this.path + '/post', news).subscribe(res => {
      this.newsResponse = res;
        console.log(this.newsResponse.fake);
        console.log("done", this.newsResponse);
    
        const dialogRef = this.dialog.open(DialogComponent, {
          data: { fake: this.newsResponse.fake, news: this.newsResponse.news },
        });



        dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog result: ${result}`);

          location.reload();
        });


    })

  }

}
