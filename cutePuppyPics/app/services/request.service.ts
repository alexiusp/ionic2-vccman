import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { ResponseWrapper } from '../models/response';

export enum RequestType {GET,POST}

@Injectable()
export class RequestService {

  constructor (
		private http: Http
  ) {}
  private _cookies;
  private handleError (error: Response) {
    console.error(error);
    return Observable.throw(error.json().message || 'Server error');
  }
  request(type : RequestType, url : string, data? : any) {
    let _url = '/' + url + '?os=unknown&v=3.00';
    let reqObserable : Observable<Response>;
    switch(type) {
      case RequestType.POST:
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let body : string = !!data ? JSON.stringify(data) : "";
        reqObserable = this.http.post(_url, body, options);
        break;
      case RequestType.GET:
      default:
        reqObserable = this.http.get(_url);
        break;
    }
    return reqObserable.map(res =>  <ResponseWrapper<any>> res.json())
      .do((res : ResponseWrapper<any>) => {
				//console.log("Request to [" + url + "] result:", res);
				if(res.error == -1) {
					console.error("Auth error:", res.message);
					//this._coreService.isLoggedIn = false;
					//this._router.navigateByUrl('/');
				}
			}).catch(this.handleError);
  }
}
