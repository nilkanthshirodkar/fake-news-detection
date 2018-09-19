import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {MatIconModule} from '@angular/material/icon';
import {
  MatButtonModule,
  MatCardModule,
  MatToolbarModule,
  MatInputModule,
  MatListModule,
  MatDialogModule
} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';
import { AuthInterceptorService } from './auth-interceptor.service';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NewsComponent } from './news/news.component';
import { DialogComponent } from './dialog/dialog.component';
const routes = [
  { path: '', component: NewsComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    NewsComponent,
    DialogComponent
  ],
  entryComponents: [DialogComponent],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatInputModule,
    MatListModule,
    MatIconModule,
    MatDialogModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule
  ],
  providers: [ApiService, AuthService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
