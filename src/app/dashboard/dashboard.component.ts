import { Component, OnInit } from '@angular/core';
import axios, { AxiosRequestConfig, AxiosPromise } from 'axios';
import { Chart } from 'chart.js';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { HttpClient } from '@angular/common/http';
import { getCurrencySymbol } from '@angular/common';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor( private router: Router) { this.getBudget();
  }

  ngOnInit(  ): void {}




getRandomNumberBetween(min,max){

  return Math.floor(Math.random()*(max-min+1)+min);
}
async send(){

  var tempDataSource = {
    datasets:[{
        data: [],
        backgroundColor:[],
    }
],
labels: []};

  console.log((<HTMLInputElement>document.getElementById('title')).value);
  console.log((<HTMLInputElement>document.getElementById('amount')).value);
  let token = localStorage.getItem("jwt");
  let color = this.getRandomNumberBetween(100000,999999);
  let username = localStorage.getItem('name')

  axios
    .post("http://localhost/addBudget", {
      title: (<HTMLInputElement>document.getElementById('title')).value,
      budget: (<HTMLInputElement>document.getElementById('amount')).value,
      color: color,
      username: username


    },
    { headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then((res) => {
      console.log(res);


      tempDataSource.datasets[0].data[0] = res.data[0].budget;
      tempDataSource.labels[0] = res.data[0].title;
      tempDataSource.datasets[0].backgroundColor[0] = "#" + res.data[0].color;
    })
    .catch((err) => {
      console.log(err);
    });


};






getBudget(){
axios.get("http://localhost/budget")
        .then(function(res:any){

         var dataSource = {
            datasets:[{
                data: [],
                backgroundColor:[],
            }
        ],
        labels: []};
    for (var i=0; i < res.data.length; i++){
        //if(i == 7){
          //  break;
       // } else{

        dataSource.datasets[0].data[i] = res.data[i].budget;
        dataSource.labels[i] = res.data[i].title;
        dataSource.datasets[0].backgroundColor[i] = "#" + res.data[i].color;

    //    }
    }

    var ctx = (<HTMLCanvasElement>document.getElementById("myChart"));
    var twoD= ctx.getContext("2d");
    var myPieChart = new Chart(twoD, {
    type: 'pie',
    data: dataSource});

    var ctx2 = (<HTMLCanvasElement>document.getElementById("myChart2"));
    var twoD2= ctx2.getContext("2d");
    var myPieChart2 = new Chart(twoD2, {
    type: 'bar',
    data: dataSource});

    var ctx3 = (<HTMLCanvasElement>document.getElementById("myChart3"));
    var twoD3= ctx3.getContext("2d");
    var myPieChart3 = new Chart(twoD3, {
    type: 'radar',
    data: dataSource});
  });
}

async remove(){

    var tempDataSource = {
      datasets:[{
          data: [],
          backgroundColor:[],
      }
  ],
  labels: []};

    console.log((<HTMLInputElement>document.getElementById('removeTitle')).value);
    console.log((<HTMLInputElement>document.getElementById('removeAmount')).value);
    let token = localStorage.getItem("jwt");
    axios
      .post("http://localhost/removeBudget", {
        title: (<HTMLInputElement>document.getElementById('removeTitle')).value,
        budget: (<HTMLInputElement>document.getElementById('removeAmount')).value,
      },
      { headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((res) => {
        console.log(res);


        tempDataSource.datasets[0].data[0] = res.data[0].budget;
        tempDataSource.labels[0] = res.data[0].title;
      })
      .catch((err) => {
        console.log(err);
      });

      (<HTMLInputElement>document.getElementById('removeTitle')).value= null;
    (<HTMLInputElement>document.getElementById('removeAmount')).value = null;


  };

}
