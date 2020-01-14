import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-playlist-component',
  templateUrl: './playlist-component.component.html',
  styleUrls: ['./playlist-component.component.css']
})
export class PlaylistComponentComponent implements OnInit {

	@Input() playlist: any
  	constructor() { }

  	ngOnInit() {
  	}

}
