import {Component, OnDestroy, OnInit} from '@angular/core';
import {VideoService} from "../services/video-service";
import {map} from "rxjs/operators";
import {Subscription} from "rxjs";
import {PlaylistService} from "../services/playlist.service";

    @Component({
        selector: 'app-search',
        templateUrl: './search.component.html',
        styleUrls: ['./search.component.css']
    })

export class SearchComponent implements OnInit, OnDestroy {

	videos = [];
	public playlists: any;
	videosSubscription: Subscription;
	public playlistSubscription: Subscription;

    constructor(private videoService: VideoService, private playlistService: PlaylistService ) { }

    ngOnInit() {
    	this.videosSubscription = this.videoService.videos$
			.pipe(
    			map((response) => this.videos = response)
			)
			.subscribe();

		this.playlistSubscription = this.playlistService.playlists$
			.pipe(
				map((response) => this.playlists = response)
			)
			.subscribe();

		this.playlistService.getPlaylists();
    }

    ngOnDestroy() {
		this.videosSubscription.unsubscribe()
	}

	search(value: string) {
		this.videoService.search(value)
	}

}
