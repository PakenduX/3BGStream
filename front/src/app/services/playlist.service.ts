import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {SERVER_ADDRESS} from "../constants/ServerAddress";
import {map} from "rxjs/operators";
import {Response} from "../models/Response";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

	public playlists$: BehaviorSubject<[]> = new BehaviorSubject([]);

  	constructor(private httpclient: HttpClient, private snackBar: MatSnackBar) { }

  	getPlaylists(){
  		let user = JSON.parse(localStorage.getItem('user'));
  		this.httpclient.get(`${SERVER_ADDRESS}/playlist/all/${user._id}`)
			.pipe(
				map((response: []) => {
					this.playlists$.next(response);
				})
			)
			.subscribe();
  	}

  	addPlaylist(name){
		let user = JSON.parse(localStorage.getItem('user'));
		let data = {
			userId: user._id,
			nom: name
		};
		this.httpclient.post(`${SERVER_ADDRESS}/playlist/create`, data)
			.pipe(
				map((response: Response) => {
					if(response.status === 'error'){
						this.snackBar.open(response.message, 'Ok', {
							duration: 5000
						});
					} else {
						window.location.reload();
					}
				})
			)
			.subscribe()
	}
}
