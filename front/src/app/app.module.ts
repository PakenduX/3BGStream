import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchComponent } from './search/search.component';
import { AppRoutingModule } from './app-routing.module';
import {
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatButtonModule,
  MatProgressSpinnerModule
} from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import {HttpClientModule} from '@angular/common/http';
import {YouTubePlayerModule} from '@angular/youtube-player';
import {FormsModule} from "@angular/forms";
import { VideoComponentComponent, VideoComponentModal, AddPlaylistRadioButtonComponentModal } from './video-component/video-component.component';
import { MatDialogModule } from "@angular/material/dialog";
import {MatRadioModule} from "@angular/material/radio";
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { RegisterComponent} from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import {JwtModule, JwtModuleOptions} from "@auth0/angular-jwt";
import { PlaylistComponent } from './playlist/playlist.component';
import { PlaylistComponentComponent } from './playlist-component/playlist-component.component';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { AddPlaylistComponentModal } from './playlist/playlist.component'

const JWT_Module_Options: JwtModuleOptions = {
	config: {
		tokenGetter: () => localStorage.getItem('3bgstreamToken'),
	}
};

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    VideoComponentComponent,
  	VideoComponentModal,
  	AddPlaylistRadioButtonComponentModal,
  	AddPlaylistComponentModal,
	LoginComponent,
	RegisterComponent,
	PlaylistComponent,
	PlaylistComponentComponent,
	VideoPlayerComponent
  ],
	entryComponents: [VideoComponentModal, AddPlaylistComponentModal, AddPlaylistRadioButtonComponentModal],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		MatToolbarModule,
		MatIconModule,
		MatCardModule,
		MatButtonModule,
		MatProgressSpinnerModule,
		MatFormFieldModule,
		MatFormFieldModule,
		MatInputModule,
		FlexLayoutModule,
		HttpClientModule,
		YouTubePlayerModule,
		FormsModule,
		MatDialogModule,
		MatRadioModule,
		MDBBootstrapModule.forRoot(),
		MatSnackBarModule,
		JwtModule.forRoot(JWT_Module_Options)
	],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
