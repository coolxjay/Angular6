import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit {

  user = {username: '', password: '', remember: false};
	hide: boolean = true;
	
  constructor(
		public dialogRef: MatDialogRef<LoginComponent>,
		private authService: AuthService
		) { }

  ngOnInit() {
  	var credentials = JSON.parse(localStorage.getItem("rememberedCredentials"));
  	if( credentials ) {
	  	this.user.username = credentials.username;
	  	this.user.password = credentials.password;
	  	this.user.remember = true; 
	  }
  }

  onSubmit() {
    console.log("User: ", this.user);
		this.authService.logIn(this.user)
		.subscribe(res => {
			if(res.success) {
				if( this.user.remember ) {
					var credentials = {username: this.user.username, password: this.user.password};
					localStorage.setItem("rememberedCredentials", JSON.stringify(credentials));
				} else {
					localStorage.removeItem("rememberedCredentials");
				}
				this.dialogRef.close();
			}
			else {
				this.user.username = '';
				this.user.password = '';
				this.user.remember = false;
				this.hide = true;
			}
		}, (err) => {
			this.user.username = '';
			this.user.password = '';
			this.user.remember = false;
			this.hide = true;
		});
  }

}

	