import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {SearchComponent} from "./search/search.component";
import { AuthGuardService as AuthGuard } from "./services/auth-guard.service";
import {PlaylistComponent} from "./playlist/playlist.component";
import {PlaylistExpandedComponent} from "./playlist-expanded/playlist-expanded.component";

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
  	path: 'search',
  	component: SearchComponent,
  	canActivate: [AuthGuard]
  }, {
		path: 'playlist',
		component: PlaylistComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'playlist-expanded',
		component: PlaylistExpandedComponent,
		canActivate: [AuthGuard]
	},
  { path: 'register', component: RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
