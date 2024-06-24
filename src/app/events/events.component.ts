import { Component, Inject, Input} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TicketComponent } from '../ticket/ticket.component'; // Importovanje komponente za kupovinu karte
import { Router } from '@angular/router';
import { Event } from '../models/event';

@Component({
    selector: 'app-events',
    templateUrl: './events.component.html',
    styleUrls: ['./events.component.css']
})
export class EventsComponent {
  events: Event[] = [
    {
      title: 'Nemačka vs Škotska',
      description: 'Otvaranje evropskog prvenstva u Nemačkoj 2024.',
      date: '14.06.2024. 21:00h',
      imageUrl: '../../assets/euro.jpg'
    },
    {
      title: 'Srbija vs Engleska',
      description: 'Prvi susret naše reprezentacije na evropskom prvenstvu',
      date: '16.06.2024. 21:00h',
      imageUrl: '../../assets/euro.jpg'
    },
    {
      title: 'Francuska vs Austrija',
      description: 'Derbi prvog kola evropskog prvenstva',
      date: '17.06.2024. 21:00h',
      imageUrl: '../../assets/euro.jpg'
    },
    {
      title: 'Španija Italija',
      description: 'Napeta utakmica između dva fudbalska giganta.',
      date: '18.06.2024. 21:00h',
      imageUrl: '../../assets/euro.jpg'
    },
    {
      title: 'Holandija Portugalija',
      description: 'Borbeni meč između dva vrhunska tima.',
      date: '19.06.2024. 21:00h',
      imageUrl: '../../assets/euro.jpg'
    },
    {
      title: 'Belgija Hrvatska',
      description: 'Utakmica koja obećava uzbudljivu igru.',
      date: '20.06.2024. 21:00h',
      imageUrl: '../../assets/euro.jpg'
    },
    {
      title: 'Srbija vs Danska',
      description: ' Utakmica za prolaz u knock-out fazu nase reprezentacije',
      date: '25.06.2024. 21:00h',
      imageUrl: '../../assets/euro.jpg'
    }
  ];

  paginatedEvents :  Event[] = [];
  currentPage = 1;
  itemsPerPage = 6;
  totalPages = 0;

  ngOnInit() {
    this.totalPages = Math.ceil(this.events.length / this.itemsPerPage);
    this.updatePaginatedEvents();
  }

  updatePaginatedEvents() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedEvents = this.events.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedEvents();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedEvents();
    }
  }

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

