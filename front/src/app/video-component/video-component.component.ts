import {Component, Inject, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-video-component',
  templateUrl: './video-component.component.html',
  styleUrls: ['./video-component.component.css']
})
export class VideoComponentComponent implements OnInit {

	@Input() video: any

  constructor(public dialog: MatDialog) { }

	openDialog() {
		const dialogRef = this.dialog.open(VideoComponentModal, {data: this.video});

		dialogRef.afterClosed().subscribe(result => {
			console.log(`Dialog result: ${result}`);
		});
	}

  ngOnInit() {
  }

}

@Component({
	selector: 'video-component-modal',
	templateUrl: 'video-component-modal.html',
})
export class VideoComponentModal {
	constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}
