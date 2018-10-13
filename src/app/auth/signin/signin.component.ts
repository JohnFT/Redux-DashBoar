import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styles: []
})
export class SigninComponent implements OnInit {

  constructor(private _authService: AuthService) { }

  ngOnInit() {
  }
  public onSubmit(data) {
    this._authService.signin(data.email, data.password);
  }
}
