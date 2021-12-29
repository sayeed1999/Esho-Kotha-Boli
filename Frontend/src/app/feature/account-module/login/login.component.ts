import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthResponse } from 'src/app/core/models/authResponse';
import { LoginUser } from 'src/app/core/models/loginUser';
import { QuestionBase } from 'src/app/core/models/question-base';
import { TextBox } from 'src/app/core/models/question-textbox';
import { AccountService } from 'src/app/core/services/account.service';
import { SweetAlertService } from 'src/app/core/services/sweet-alert.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = 'Login User';
  questions: QuestionBase<string>[] = [];

  constructor(
    private acc: AccountService,
    private sb: MatSnackBar,
    private sweetalert: SweetAlertService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.questions = [
      new TextBox({
        key: 'email',
        label: 'Email',
        type: 'email',
        placeholder: 'Your email here',
        validators: [Validators.required, Validators.email]
      }),

      new TextBox({
        key: 'password',
        label: 'Password',
        type: 'password',
        placeholder: 'Your password here',
        validators: [Validators.required, Validators.minLength(6)]
      })
    ];
  }

  received(e: LoginUser) {
    this.acc.login(e).subscribe(
      res => {
        // alert('jwt token generated!\n' + res.token);
        // this.sb.open('You have successfully logged in to your account. :)', 'Dismiss');
        this.sweetalert.textNIcon("Logged In Successfully!", "success");
        this.router.navigate(['newsfeed']);
      },
      (error: HttpErrorResponse) => {
        if(error.status === 0) this.sb.open('Network Problem. Please try with proper connection!');
        // else this.sb.open(error.error.errorMessage, 'Oh no!');
        else this.sweetalert.textNIcon("Invalid attempt!", "error");
      }
    );
  }
}
