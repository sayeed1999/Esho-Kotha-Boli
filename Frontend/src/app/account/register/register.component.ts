import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { QuestionBase } from 'src/app/models/question-base';
import { RadioGroup } from 'src/app/models/question-radiogroup';
import { TextBox } from 'src/app/models/question-textbox';
import { RegisterUser } from 'src/app/models/registerUser';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  title = 'Register User';
  questions: QuestionBase<any>[] = [];
  sexes = 
      [
        // { name: 'Male', value: 1 },
        // { name: 'Female', value: 2 },
      ];
  relationshipStatuses = 
      [
        // { name: 'Not provided', value: 0 },
        // { name: 'Single', value: 1 },
        // { name: 'Married', value: 2 },
      ];
  sexesFetched = false;
  relationshipStatusesFetched = false;
  rerendering = false;

  constructor(
    private accountService: AccountService,
    private sb: MatSnackBar,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.fetchSexes();
    this.fetchRelationshipStatuses();
  }

  fetchSexes() {
    this.accountService.getAllSex().subscribe(
      res => {
        this.sexes = res;
        this.sexesFetched = true;
        if(this.relationshipStatusesFetched) this.initializeForm();
      },
      error => {
        this.sb.open('Sex fetching failed', 'Okay');
      }
    );
  }

  fetchRelationshipStatuses() {
    this.accountService.getAllRelationshipStatus().subscribe(
      res => {
        this.relationshipStatuses = res;
        this.relationshipStatusesFetched = true;
        if(this.sexesFetched) this.initializeForm();
      },
      error => {
        this.sb.open('Relationship status fetching failed', 'Okay');
      }
    );
  }

  initializeForm() {
    console.log('account register form initialized')
    this.questions = [
      new TextBox({
        key: 'userName',
        value: '',
        label: 'UserName',
        type: 'text',
        placeholder: 'Choose a unique username (min 6 characters)',
        validators: [Validators.required, Validators.minLength(6)],
      }),
      new TextBox({
        key: 'firstName',
        value: '',
        label: 'FirstName',
        type: 'text',
        placeholder: 'Your firstname here',
        validators: [Validators.required, Validators.minLength(1)],
      }),
      new TextBox({
        key: 'lastName',
        value: '',
        label: 'LastName',
        type: 'text',
        placeholder: 'Your lastname here',
        validators: [Validators.required, Validators.minLength(1)],
      }),
      new TextBox({
        key: 'dateOfBirth',
        value: '',
        label: 'DateOfName',
        type: 'date',
        placeholder: 'Your dateOfBirth here',
        validators: Validators.required,
      }),
      new RadioGroup({
        key: 'sex',
        label: 'Select sex:',
        options: this.sexes,
        validators: Validators.required,
      }),
      new RadioGroup({
        key: 'relationshipStatus',
        label: 'Relationship Status:',
        options: this.relationshipStatuses,
        validators: Validators.required,
      }),
      new TextBox({
        key: 'email',
        label: 'Email',
        type: 'email',
        placeholder: 'Your email here (must be in valid format)',
        validators: [Validators.required, Validators.email]
      }),
      new TextBox({
        key: 'password',
        label: 'Password',
        type: 'password',
        placeholder: 'Choose a strong password (min 6 characters)',
        validators: [Validators.required, Validators.minLength(6)],
      }),
      new TextBox({
        key: 'confirmPassword',
        label: 'Confirm Password',
        type: 'password',
        placeholder: 'Re-write your password',
        validators: [Validators.required, Validators.minLength(6)],
      })
    ];
  }

  received(e: RegisterUser) {
    this.accountService.register(e).subscribe(
      res => {
        this.sb.open('Account registered successfully', 'Hurrah!!!');
        this.router.navigate(['..', 'login']);
      },
      (error: HttpErrorResponse) => {
        if(error.status === 0) this.sb.open('Network error. Please check your internet connection!', 'So Bad');
        else this.sb.open(error.error, 'Okay');
      }
    );
  }

}
