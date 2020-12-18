import { Component, OnInit } from '@angular/core';
import axios, { AxiosRequestConfig, AxiosPromise } from 'axios';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private router: Router) { }

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
      axios.post('http://159.65.225.237:3000/api/user', data)
          .then(res => {
              console.log(res);
              (<HTMLInputElement>document.getElementById('username')).value = '';
              (<HTMLInputElement>document.getElementById('password')).value = '';
              if(res && res.data && res.data.success) {
                  const token = res.data.token;
                  localStorage.setItem('jwt',token);
                  this.router.navigateByUrl('/Dashboard');
                }
          });
  }
}

