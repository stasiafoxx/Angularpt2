import { Injectable } from '@angular/core';

import { User } from '../classes/user';
import { ApiService } from './api.service';
import { Router } from '../../../node_modules/@angular/router';
import { LocalStorageService } from './local-storage.service';

// import { LoginComponent } from '../components/login/login.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private api: ApiService, private router: Router, private localStorage: LocalStorageService) { }
  register(user: User) {
    return this.api.post('/postUser', user).subscribe((res: any) => {
      this.api.get(`/user/${res._id}`);
      this.localStorage.set('/currentUser', res.user);
    }, err => console.log(err), () => this.router.navigateByUrl('/'));
  }

  login(user: any) {
    return this.api.post('/userLogin', user).subscribe((res: any) => {
      this.localStorage.set('currentUser', res.user);
    }, err => console.log(err), () => this.router.navigateByUrl('/'));
  }

  logout () {
  this.localStorage.remove('currentUser');
  this.router.navigateByUrl('/login');
  }

  getAllUsers() {
  return this.api.get('/getAllUsers');
  }

  getUser(_id) {
    return this.api.get('/user/:${_id}');
  }
 }

