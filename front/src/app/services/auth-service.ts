import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {SERVER_ADDRESS} from '../constants/ServerAddress';
import {BehaviorSubject} from "rxjs";
import {map} from "rxjs/operators";
import {User} from "../models/User";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

	public user$: BehaviorSubject<any> = new BehaviorSubject({});
	public errorMessage$: BehaviorSubject<string> = new BehaviorSubject('');
	public isConnected$: BehaviorSubject<boolean> = new BehaviorSubject(localStorage.getItem('3bgstreamToken') !== null && localStorage.getItem('3bgstreamToken') !== '');

  	constructor(
  		private httpclient: HttpClient,
		private snackBar: MatSnackBar,
		private router: Router,
		public jwtHelper: JwtHelperService
	) { }

	login(user){
	  this.httpclient.post(`${SERVER_ADDRESS}/auth/login`, user)
		  .pipe(
		  	map((response : User) => {
		  		if(response.status !== undefined && response.status === 'error'){
		  			this.snackBar.open(response.message, 'Ok', {
		  				duration: 5000
					});
		  			this.errorMessage$.next(response.message)
				} else {
					this.user$.next(response.user)
					localStorage.setItem('user', JSON.stringify(response.user))
					localStorage.setItem('3bgstreamToken', response.token)
					this.isConnected$.next(true)
					this.router.navigateByUrl('/search')
				}
		  	})
		  )
		  .subscribe()
	}
	logout(){
		localStorage.removeItem('3bgstreamToken')
		localStorage.removeItem('user')
		this.isConnected$.next(false)
		this.router.navigateByUrl('/')
	}

	public isAuthenticated(): boolean {
		const token = localStorage.getItem('3bgstreamToken');
		return !this.jwtHelper.isTokenExpired(token);
	}

}
