import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  public loginInvalid = false;
  private formSubmitAttempt = false;

  constructor(private httpClient: HttpClient, private fb: FormBuilder, private router: Router) { 
    this.form = this.fb.group({
    username: ['', Validators.email],
    password: ['', Validators.required]
  });
}
  ngOnInit() {
    this.appToken().subscribe((data: any)=>{
      const container = document.getElementById('app')
      if(data){
        for(let x in data){
          const y = data[x];
          for(let z in y){
            if(container)
              container.innerHTML = y[z]
          }
        }
      }
    })
  }

  appToken(){
    return this.httpClient.get(`http://localhost:3005/app_token/generate?app_name[]=card_issuance`)
  }

  login(username: string, password: string){
    return this.httpClient.post(`http://localhost:3005/user/login`, { user_name: username, password: password })
  }

  async onSubmit(): Promise<void> {
    this.loginInvalid = false;
    if (this.form.valid) {
      try {
        const username = this.form.get('username')?.value;
        const password = this.form.get('password')?.value;
        this.login(username, password).subscribe((data: any)=>{
          if(data){
            if(data.access_token){
              sessionStorage.setItem("user_token", data.access_token);
              this.router.navigate(['/dashboard'])
            }
          }
        },error => {
          this.loginInvalid = true;
      })
      } catch (err) {
        this.loginInvalid = true;
      }
    } else {
      this.formSubmitAttempt = true;
    }
  }

}
