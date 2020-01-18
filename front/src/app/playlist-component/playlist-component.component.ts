import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {PlaylistService} from "../services/playlist.service";

@Component({
  selector: 'app-playlist-component',
  templateUrl: './playlist-component.component.html',
  styleUrls: ['./playlist-component.component.css']
})
export class PlaylistComponentComponent {

	@Input() playlist: any
  	constructor(private router: Router, private playlistService: PlaylistService) { }

  	goToPl(){
		this.router.navigate(
			['/playlist-expanded'],
			{
				queryParams: {
					plId: this.playlist._id,
					plName: this.playlist.nom
				}
			}
		)
	}

	delete(){
		if(confirm('Are you sure you want to delete your playlist ?')) {
			this.playlistService.deletePl(this.playlist._id);
		}
	}

}
