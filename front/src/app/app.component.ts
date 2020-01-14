import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {AuthService} from "./services/auth-service";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
	isConnected: boolean
	isConnectedSubscription: Subscription

	constructor(private router: Router, private authService: AuthService) { }

	ngOnInit(): void {
		this.isConnectedSubscription = this.authService.isConnected$
			.pipe(map(response => this.isConnected = response))
			.subscribe()
	}
	ngOnDestroy(): void {
		this.isConnectedSubscription.unsubscribe()
	}
	logout(){
		this.authService.logout()
	}
}
