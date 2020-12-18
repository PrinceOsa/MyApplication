import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface myData {
  email: string,
  status: boolean,
  quote: string
}

interface isLoggedIn {
  status: boolean
}

interface quoteStatus {
  success: boolean
}

interface logoutStatus {
  success: boolean
}
@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get<myData>('/api/data')
  }

  updateQuote(value) {
    return this.http.post<quoteStatus>('/api/quote', {
      value
    })
  }



  logout() {
    return this.http.get<logoutStatus>('/api/logout')
  }

}
