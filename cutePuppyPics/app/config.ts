import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';

@Injectable()
export class AppConfig {
  private _server_url : string;
  private _api_ver : string;
  constructor (platform: Platform) {
    if(platform.is('core')) this._server_url = "";
    else this._server_url = "http://api.vircities.com";
    this._api_ver = "3.10";
  }
  getUrl() : string {
    return this._server_url;
  }
  getVer() : string {
    return this._api_ver;
  }
}
