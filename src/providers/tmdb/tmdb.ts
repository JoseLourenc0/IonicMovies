import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {info} from '../info'

/*
  Generated class for the TmdbProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TmdbProvider {
  
  buildUrl(method,params?) {
    let parameters = ''
    params.forEach(
      el => {
        parameters = parameters.concat(`&${el[0]}=${el[1]}`)
      }
    )
    return `${this.baseUrl + method}?api_key=${info.apiKey}${parameters ? parameters : ''}`
  }

  private baseUrl = `https://api.themoviedb.org/3`

  constructor(public http: HttpClient) {
    //console.log('Hello TmdbProvider Provider');
  }

  getAPIMethod(method,params?){
    return this.http.get(this.buildUrl(method,params ? params : []))
  }

}
