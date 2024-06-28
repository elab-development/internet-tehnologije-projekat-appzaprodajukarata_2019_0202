import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EventsComponent } from './events/events.component';
import { LoginComponent } from './login/login.component';
import { TicketComponent } from './ticket/ticket.component'; 
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './auth.guard';
import { CreateEventComponent } from './create-event/create-event.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'events', component: EventsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'tickets', component: TicketComponent },
  { path: 'profile', component: ProfileComponent,
    canActivate:[AuthGuard],
  },
  { path: 'create-event', component: CreateEventComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
