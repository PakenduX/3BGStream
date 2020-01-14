import {Component, OnDestroy, OnInit} from '@angular/core';
import { AuthService } from '../services/auth-service';
import {Subscription} from "rxjs";
import {map} from "rxjs/operators";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

	user: {}
	errorMessage: string
	userSubscription: Subscription
	errorSubscription: Subscription
	constructor(private authservice: AuthService, private router: Router) { }

	ngOnInit() {
		if(localStorage.getItem('3bgstreamToken') !== null && localStorage.getItem('3bgstreamToken') !== ''){
			this.router.navigateByUrl('/search')
		} else {
			this.userSubscription = this.authservice.user$
				.pipe(
					map((response) => this.user = response)
				)
				.subscribe()
			this.errorSubscription = this.authservice.errorMessage$
				.pipe(
					map((response) => this.errorMessage = response)
				)
				.subscribe()
		}
	}

	ngOnDestroy(): void {
		if(localStorage.getItem('3bgstreamToken') === null){
			this.userSubscription.unsubscribe()
		}
	}

	loginUser(user){
		this.authservice.login(user)
	}
}
