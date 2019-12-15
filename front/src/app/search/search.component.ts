import {Component, OnDestroy, OnInit} from '@angular/core';
import {VideoService} from "../services/video-service";
import {map} from "rxjs/operators";
import {Subscription} from "rxjs";

    @Component({
        selector: 'app-search',
        templateUrl: './search.component.html',
        styleUrls: ['./search.component.css']
    })

export class SearchComponent implements OnInit, OnDestroy {

	videos = []
	videosSubscription: Subscription
    constructor(private videoService: VideoService ) { }

    ngOnInit() {
    	this.videosSubscription = this.videoService.videos$
			.pipe(
    			map((response) => this.videos = response)
			)
			.subscribe()
    }

    ngOnDestroy() {
		this.videosSubscription.unsubscribe()
	}

		search(value: string) {
		console.log(value)
		this.videoService.search(value)
	}

}
