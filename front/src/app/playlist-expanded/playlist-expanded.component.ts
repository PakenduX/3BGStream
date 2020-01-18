import {Component, OnDestroy, OnInit} from '@angular/core';
import {VideoService} from "../services/video-service";
import {Subscription} from "rxjs";
import {map} from "rxjs/operators";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-playlist-expanded',
  templateUrl: './playlist-expanded.component.html',
  styleUrls: ['./playlist-expanded.component.css']
})
export class PlaylistExpandedComponent implements OnInit, OnDestroy {

	plId: any;
	plName: any;
	videoSubscription: Subscription;
	paramsSubscription: Subscription;
	public videos: any;
  	constructor(private videoService: VideoService, private route: ActivatedRoute) { }

  	ngOnInit() {
		this.paramsSubscription = this.route.queryParams
			.subscribe(params => {
				this.plId = params.plId;
				this.plName = params.plName;
			});

		this.videoSubscription = this.videoService.plVideos$
			.pipe(
				map((response) => this.videos = response)
			)
			.subscribe();

		this.videoService.getPlVideos(this.plId);
	}

	ngOnDestroy(): void {
  		this.paramsSubscription.unsubscribe();
		this.videoSubscription.unsubscribe();
	}

}
