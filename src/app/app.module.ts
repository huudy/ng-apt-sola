import { AlertComponent } from './error/alert/alert.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LandingComponent } from './landing/landing.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';

import { HomeModule } from './home/home.module';
import { LoginComponent } from './login/login.component';
import { RoomsComponent } from './rooms/rooms.component';
import { RoomCardComponent } from './rooms/room-card/room-card.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './auth/auth.service';
import { JwtInterceptor } from './error/jwt.interceptor';
import { ErrorInterceptor } from './error/error.interceptor';
@NgModule({
	declarations: [
		AppComponent,
		SignupComponent,
		LandingComponent,
		ProfileComponent,
		NavbarComponent,
		FooterComponent,
		LoginComponent,
		RoomsComponent,
		RoomCardComponent,
		AlertComponent
	],
	imports: [
		BrowserModule,
		NgbModule.forRoot(),
		FormsModule,
		RouterModule,
		AppRoutingModule,
		HomeModule,
		HttpClientModule,
		ReactiveFormsModule
	],
	providers: [
		AuthService,
		// {
		// 	provide: HTTP_INTERCEPTORS,
		// 	useClass: JwtInterceptor,
		// 	multi: true
		// },
		{
			provide: HTTP_INTERCEPTORS,
			useClass: ErrorInterceptor,
			multi: true
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
