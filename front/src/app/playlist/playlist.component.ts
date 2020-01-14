import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {PlaylistService} from "../services/playlist.service";
import {map} from "rxjs/operators";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit, OnDestroy {

	public playlists: [];
	public playlistSubscription: Subscription;
	public dialogRef: any;
  	constructor(private playlistService: PlaylistService, public dialog: MatDialog) { }

  	ngOnInit() {
  		this.playlistSubscription = this.playlistService.playlists$
			.pipe(
				map((response) => this.playlists = response)
			)
			.subscribe();

		this.playlistService.getPlaylists();
  	}

	ngOnDestroy(): void {
  		this.playlistSubscription.unsubscribe();
	}

	openDialog() {
		this.dialogRef = this.dialog.open(AddPlaylistComponentModal);
		this.dialogRef.afterClosed().subscribe(result => {
			console.log(`Dialog result: ${result}`);
		});
	}

}

/**
 * For add to playlist modal
 */
@Component({
	selector: 'addPlaylist-component-modal',
	templateUrl: 'addPlaylist-modal-component.html',
})
export class AddPlaylistComponentModal {
	constructor(@Inject(MAT_DIALOG_DATA) public data: any, private playlistService: PlaylistService, public dialogRef: MatDialogRef<PlaylistComponent>) { }

	addPlayList(name) {
		this.playlistService.addPlaylist(name);
		this.dialogRef.close();
	}
}
