import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.appToken().subscribe((data: any)=>{
      const container = document.getElementById('app')
      if(data){
        for(let x in data){
          const y = data[x];
          for(let z in y){
            if(container)
              container.innerHTML = container.innerHTML + y[z]
          }
        }
      }
    })
  }

  appToken(){
    return this.httpClient.get(`http://localhost:3005/app_token/generate?app_name[]=card_balance&app_name[]=card_transactions&user_auth_token=` +sessionStorage.getItem("user_token"))
  }
}
