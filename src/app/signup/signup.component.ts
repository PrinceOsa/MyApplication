import { Component, OnInit } from '@angular/core';
import axios, { AxiosRequestConfig, AxiosPromise } from 'axios';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  signUp(){

    if((<HTMLInputElement>document.getElementById('username')).value == ''){
      console.error('Enter a username');
      return;
    }
    else if((<HTMLInputElement>document.getElementById('password')).value = ''){
      console.error('Enter Password');
      return;
    }


      const data = {
          username: (<HTMLInputElement>document.getElementById('username')).value,
          password: (<HTMLInputElement>document.getElementById('password')).value,
      };
      axios.post('http://localhost:3200/api/user', data)
          .then(res => {
              console.log(res);
              (<HTMLInputElement>document.getElementById('username')).value = '';
              (<HTMLInputElement>document.getElementById('password')).value = '';
              if(res && res.data && res.data.success) {
                  const token = res.data.token;
                  localStorage.setItem('jwt',token);
                  location.assign('/Dashboard');
                }
          });
  }
}

