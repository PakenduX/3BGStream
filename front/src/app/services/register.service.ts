import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SERVER_ADDRESS} from '../constants/ServerAddress';
import {MatSnackBar} from "@angular/material/snack-bar";
import {Response} from "../models/Response";
import {Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  public user;

  constructor(
  	private httpClient: HttpClient,
	private snackBar: MatSnackBar,
	private router: Router
  ) { }

  register(user){
  	this.httpClient.post(`${SERVER_ADDRESS}/auth/register`, user)
		.subscribe(async (data: Response) => {
			if(data.status !== undefined && data.status === 'error'){
				this.snackBar.open(data.message, 'Ok', {duration: 5000})
			} else if (data.errors !== undefined){
				const promises = data.errors.map((error: Response) => error.msg)
				const results = await Promise.all(promises)
				const message = results.join(' . ')
				this.snackBar.open(message, 'Ok', {duration: 5000} )
			} else {
				this.snackBar.open(data.message, 'Ok', {duration: 3000})
				await this.router.navigateByUrl('/')
			}
		})
  }
}
