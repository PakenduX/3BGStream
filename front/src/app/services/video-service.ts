import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SERVER_ADDRESS} from '../constants/ServerAddress';
import {BehaviorSubject} from "rxjs";
import {map} from "rxjs/operators";
import { Video } from "../models/Video";

@Injectable({
  providedIn: 'root'
})
export class VideoService {

	public videos$: BehaviorSubject<any[]> = new BehaviorSubject([]);
	public plVideos$: BehaviorSubject<any[]> = new BehaviorSubject([]);

  	constructor(private httpClient: HttpClient) {}

	public search(query){
		this.httpClient.post(`${SERVER_ADDRESS}/video/search`, {query})
			.pipe(
				map((response: Video) => {
					this.videos$.next(response.items)
				})
			)
			.subscribe()
	}

	getPlVideos(plId){
		this.httpClient.get(`${SERVER_ADDRESS}/video/all/${plId}`)
			.pipe(
				map((response: []) => {
					this.plVideos$.next(response)
				})
			)
			.subscribe()
	}
}
