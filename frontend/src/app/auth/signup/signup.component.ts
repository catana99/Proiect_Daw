import { UsersService } from './../../core/users.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css', '../auth.style.css']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  hide = true;

  constructor(
    public fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private usersService: UsersService
  ) {
    this.signUpForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['',
    [
      Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
      Validators.minLength(6),
      Validators.maxLength(25)
    ]]
    })
  }


  ngOnInit() {
  }

  get email()
  {
    return this.signUpForm.get('email')
  }

  get password()
  {
    return this.signUpForm.get('password')
  }

  signUp(){
    return this.auth.emailSignUp(this.email.value, this.password.value)
    .then(user => {
      let newUser = { //userul de trimis catre colectia Users din firebase
        email: this.email.value,
        password: this.password.value
      }
      console.warn('userul creat', newUser);

      if (this.signUpForm.valid) {
        this.router.navigate(['/']); //dupa ce m-am inregistrat cu succes, redirectionez la pagina de logare
        this.usersService.addUser(newUser); //adaug noul user in colectia Users din firebase
      }
    })
  }

}

