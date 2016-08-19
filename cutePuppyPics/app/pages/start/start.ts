import { Component } from '@angular/core';
import { AccountService } from './account.service';
import { Credentials } from '../../models/credentials';

@Component({
  templateUrl: 'build/pages/start/start.html'
})
export class StartPage {
  user : Credentials;
  constructor(
    private _accountService : AccountService
  ) {
    console.log("Start page started...");
  }
  login() {
    console.log("login clicked");
    this._accountService.login(this.user)
      .subscribe((res : any) => {
        console.log("end response:", res);
      })
  }
}
