import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { fetchUserToken } from './api';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private router: Router) {}

  async loginUser(event) {
    event.preventDefault();
    const target = event.target;
    const username = target.querySelector('#username').value;
    const password = target.querySelector('#password').value;

    fetchUserToken(username, password)
      .then(() => {
        this.router.navigateByUrl('/cards', {
          state: { username, password },
        });
        return false;
      })
      .catch((err) => {
        console.log(err);
        alert('Wrong credentials!');
      });
  }
}