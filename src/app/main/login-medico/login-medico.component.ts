import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../auth/user';

@Component({
  selector: 'app-login-medico',
  templateUrl: './login-medico.component.html',
  styleUrls: ['./login-medico.component.scss']
})
export class LoginMedicoComponent implements OnInit {

  user$ : Observable<User>
  authenticated$: Observable<boolean>;

  constructor() { }

  ngOnInit() {
  }

}
