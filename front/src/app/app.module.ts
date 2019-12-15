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
import { VideoComponentComponent, VideoComponentModal } from './video-component/video-component.component';
import { MatDialogModule } from "@angular/material/dialog";

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    VideoComponentComponent,
  	VideoComponentModal
  ],
	entryComponents: [VideoComponentModal],
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
		MatDialogModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
