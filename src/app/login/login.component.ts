import { Component, OnInit } from '@angular/core';
import axios, { AxiosRequestConfig, AxiosPromise } from 'axios';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {

  }
  getDashboard() {
    const token = localStorage.getItem('jwt');
    axios.get('http://159.65.225.237:3000/Dashboard', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(res => {
        if (res && res.data && res.data.success) {
          location.assign('/dashboard');
            history.pushState({pageID: 'Dashboard'}, 'Dashboard', '/Dashboard');


        }
    });
  }
   login(){
    const data = {
        username: (<HTMLInputElement>document.getElementById('username')).value,
        password: (<HTMLInputElement>document.getElementById('password')).value,
    };
    axios.post('http://159.65.225.237:3000/api/login', data)
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
