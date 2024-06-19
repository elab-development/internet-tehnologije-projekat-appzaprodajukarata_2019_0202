import { Component, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TicketComponent } from '../ticket/ticket.component'; // Importovanje komponente za kupovinu karte
import { Router } from '@angular/router';

@Component({
    selector: 'app-events',
    templateUrl: './events.component.html',
    styleUrls: ['./events.component.css']
})
export class EventsComponent {

  constructor(@Inject(MatDialog) public dialog: MatDialog, private router:Router) {}

    // Funkcija koja otvara dialog za kupovinu karte
    openTicketPurchase() {
        this.dialog.open(TicketComponent, {
            width: '500px', // Širina dialoga
            // Možete dodati još opcija za dialog prema potrebi
        });
    }

    navigateToTicketComponent() {
      this.router.navigate(['/tickets']); // Navigacija na /tickets rutu (TicketComponent)
    }
}

