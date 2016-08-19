import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { RequestType, RequestService } from '../../services/request.service';
import { Credentials } from '../../models/credentials';
import { ResponseWrapper } from '../../models/response';
import { Account } from '../../models/account';

@Injectable()
export class AccountService {

  constructor (
    private _server : RequestService
  ) {}
  login(user : Credentials) {
    //this._messages.clearMessages();
		//console.log("user login:", user);
    let data = {
      data : {
        User : user
      }
    };
		return this._server.request(RequestType.POST, "users/app_auth.json", data).do((res : ResponseWrapper<Account>) => {
			this.onLogin(user, res);
		}).catch(this.handleError);
  }
  onLogin(user : Credentials, userData : ResponseWrapper<Account>) {
    console.log("login request finished:", userData);
    if(userData.error > 0) this.onError(userData.message);
    else {
      //this._user = userData.data;
      //this._core.isLoggedIn = true;
      console.log("login successfull");
    }
  }
  onError(error: string) {
    console.error(error);
    //this._messages.addMessage("error", error);
  }
	handleError(error: Response) {
		let errString = error.json().message || 'Server error';
		this.onError(errString)
		return Observable.throw(errString);
	}

}
