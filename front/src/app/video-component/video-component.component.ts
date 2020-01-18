import {Component, Inject, Input, OnDestroy, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Subscription} from "rxjs";
import {PlaylistService} from "../services/playlist.service";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-video-component',
  templateUrl: './video-component.component.html',
  styleUrls: ['./video-component.component.css']
})
export class VideoComponentComponent implements OnInit, OnDestroy{

	@Input() video: any;
	public playlists: any;
	public dialogRef: any;
	public playlistSubscription: Subscription;

  constructor(public dialog: MatDialog, private playlistService: PlaylistService) { }

	ngOnDestroy(): void {
		this.playlistSubscription.unsubscribe();
	}
	ngOnInit(): void {
		this.playlistSubscription = this.playlistService.playlists$
			.pipe(
				map((response) => this.playlists = response)
			)
			.subscribe();
	}

	openDialog() {
		const dialogRef = this.dialog.open(VideoComponentModal, {disableClose: true, data: this.video});
		dialogRef.afterClosed().subscribe(result => {
			console.log(`Dialog result: ${result}`);
		});
	}

	openAddPlDialog() {
		this.dialogRef = this.dialog.open(AddPlaylistRadioButtonComponentModal, {data: {video: this.video, playlists: this.playlists}});
		this.dialogRef.afterClosed().subscribe(result => {
			console.log(`Dialog result: ${result}`);
		});
	}

}

@Component({
	selector: 'video-component-modal',
	templateUrl: 'video-component-modal.html',
})
export class VideoComponentModal {
	constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}

/**
 * For add to playlist modal
 */
@Component({
	selector: 'addPlaylist-component-modal',
	templateUrl: 'addPlaylist-component-modal.html',
})
export class AddPlaylistRadioButtonComponentModal {
	plId: string;
	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		public dialogRef: MatDialogRef<VideoComponentComponent>,
		private playlistService: PlaylistService
	) {}

	addToPlaylist(){
		this.playlistService.addVideoToPl(
			this.data.video.id.videoId,
			this.plId,
			this.data.video.snippet.title,
			this.data.video.snippet.thumbnails.high.url,
			this.data.video.snippet.description
		);
		this.dialogRef.close();
	}
}
