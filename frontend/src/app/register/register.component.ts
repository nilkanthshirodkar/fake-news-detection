import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerData = {}

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }
  post() {
    console.log(this.registerData)
    this.authService.registerUser(this.registerData)
  }

}
