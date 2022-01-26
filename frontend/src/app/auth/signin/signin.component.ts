import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css', '../auth.style.css']
})
export class SigninComponent implements OnInit {

  signInForm: FormGroup;
  hide = true;

  constructor(
    public fb: FormBuilder,
    public auth: AuthService,
    private router: Router
  ) {
    this.signInForm = this.fb.group( {
      email: ['', [Validators.email, Validators.required]],
      password: ['',
    [
      Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
      Validators.minLength(6),
      Validators.maxLength(25)
    ]]
    } )
  }

  ngOnInit() {
  }

  get email()
  {
    return this.signInForm.get('email')
  }

  get password()
  {
    return this.signInForm.get('password')
  }

  signIn(){
    return this.auth.emailSignIn(this.email.value, this.password.value)
    .then(user =>{
      if (this.signInForm.valid) {
        this.router.navigate(['/home']); //dupa ce m-am logat cu succes, redirectionez catre pagina de home cu toate functionalitatile aplicatiei
      }
    })
  }

}

