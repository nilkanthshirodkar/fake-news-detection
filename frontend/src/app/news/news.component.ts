import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  constructor(private apiService: ApiService, private authService : AuthService, private router: Router) { }

  postNews = '';
  fakenews = '';

  ngOnInit() {
    this.apiService.getNews();
  }

  post() {

      console.log("check Auth", this.authService.isAuthenticated);

      if(!this.authService.isAuthenticated){
        this.router.navigate(['register']);
      }

       this.apiService.postNews({news: this.postNews})
  
  }

}