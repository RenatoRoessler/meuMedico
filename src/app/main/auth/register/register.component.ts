import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../user';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formRegister : FormGroup =  this.fb.group({
    'firstname': ['',[Validators.required]],
    'lastname': ['', [Validators.required]],
    'address': ['',[]],
    'city': ['',[]],
    'state': ['', []],
    'phone': ['', []],
    'mobilephone': ['', []],
    'email': ['', [ Validators.required, Validators.email]],
    'password1': ['',[Validators.required, Validators.minLength(6)]],
    'password2': ['', [Validators.required, Validators.minLength(6)]]
  },
    {validator: this.matchingPassowrds }
  );

  states = ['MG', 'RS', 'SC', 'SP', 'PR', 'DF', 'RJ']

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar : MatSnackBar,
    private router: Router) { }

  ngOnInit() {
  }

  matchingPassowrds(group: FormGroup) {
    if (group) {
      const password1 = group.controls['password1'].value;
      const password2 = group.controls['password2'].value;
      if (password1 == password2) {
        return null;
      }
    }
    return {matching: false};
  }

  onSubmit() {
    const newUser: User = {
      firstname: this.formRegister.value.firstname,
      lastname: this.formRegister.value.lastname,
      address: this.formRegister.value.address,
      city: this.formRegister.value.city,
      state: this.formRegister.value.state,
      phone: this.formRegister.value.phone,
      mobilephone: this.formRegister.value.mobilephone,
      email: this.formRegister.value.email,
      password: this.formRegister.value.password1
    };
    this.authService.register(newUser)
      .subscribe(
        (u) => {
          this.snackBar.open('Usuário registrado com Sucesso','OK',{duration:3000});
          this.router.navigateByUrl('/auth/login');
        },
        (err) =>{
          console.log(err);
          this.snackBar.open('Erro, Você não está registrado','OK',{duration:3000});
        }
      );
  }

}
