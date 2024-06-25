import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { EventsComponent } from './events/events.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { TicketComponent } from './ticket/ticket.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MaterialModule } from './material/material.module';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './profile/profile.component';
import { TokenInterceptor } from './token.interceptor';
import { InputBorderHighlightDirective } from './directives/input-border-highlight.directive';
import { CardHighlightDirective } from './directives/card-highlight.directive';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EventsComponent,
    HeaderComponent,
    LoginComponent,
    TicketComponent,
    ProfileComponent,
    InputBorderHighlightDirective,
    CardHighlightDirective,
    FooterComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptor,
    multi : true,
  },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
