import { Component, OnInit, Inject } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatDialog, MatDialogRef } from '@angular/material';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

	username: string = undefined;
	admin: boolean = false;
	subscription: Subscription;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
    
  constructor(
  	private breakpointObserver: BreakpointObserver,
  	private dialog: MatDialog,
  	@Inject('BaseURL') public BaseURL,
		private authService: AuthService
  ) {}
  
  ngOnInit() {
  	this.authService.loadUserCredentials();
		this.subscription = this.authService.getUserInfo()
	 	.subscribe(userInfo => { 
			this.username = userInfo.username; 
			this.admin = userInfo.admin; })
  }

  ngOnDestroy() {
		this.subscription.unsubscribe();
	}

  openLoginForm() {
  	this.dialog.open(LoginComponent, {width: '500px', height:'450px'});
  }

  logOut() {
		this.username = undefined;
		this.authService.logOut();
	}

}
