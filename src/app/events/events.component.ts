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
      title: "Nemačka vs Engleska",
      stadium: "Allianz Arena, Munich",
      date: "15/07/24 21:00",
      imageUrl: "../../assets/euro.jpg",
    },
    {
      title: "Francuska vs Italija",
      stadium: "Red Bull Arena, Leipzig",
      date: "16/07/24 20:30",
      imageUrl: "../../assets/euro.jpg",
    },
    {
      title: "Portugal vs Španija",
      stadium: "Borussia-Park, Monchengladbach",
      date: "17/07/24 19:45",
      imageUrl: "../../assets/euro.jpg",
    },
    {
      title: "Holandija vs Belgija",
      stadium: "Deutsche Bank Park, Frankfurt",
      date: "18/07/24 20:00",
      imageUrl: "../../assets/euro.jpg",
    },
    {
      title: "Švajcarska vs Austrija",
      stadium: "Olympiastadion, Berlin",
      date: "19/07/24 21:15",
      imageUrl: "../../assets/euro.jpg",
    },
    {
      title: "Poljska vs Ukrajina",
      stadium: "WWK Arena, Augsburg",
      date: "20/07/24 20:45",
      imageUrl: "../../assets/euro.jpg",
    },
    {
      title: "Švedska vs Danska",
      stadium: "Schwarzwald-Stadion, Freiburg",
      date: "21/07/24 20:30",
      imageUrl: "../../assets/euro.jpg",
    },
    {
      title: "Rusija vs Finska",
      stadium: "Stadion An der Alten Försterei, Berlin",
      date: "22/07/24 19:00",
      imageUrl: "../../assets/euro.jpg",
    },
    {
      title: "Mađarska vs Rumunija",
      stadium: "SchücoArena, Bielefeld",
      date: "23/07/24 20:00",
      imageUrl: "../../assets/euro.jpg",
    },
    {
      title: "Irska vs Wales",
      stadium: "Max-Morlock-Stadion, Nurnberg",
      date: "24/07/24 18:30",
      imageUrl: "../../assets/euro.jpg",
    },
    {
      title: "Češka vs Slovačka",
      stadium: "Jonathan-Heimes-Stadion am Böllenfalltor, Darmstadt",
      date: "25/07/24 19:45",
      imageUrl: "../../assets/euro.jpg",
    },
    {
      title: "Škotska vs Hrvatska",
      stadium: "BWT-Stadion am Hardtwald, Sandhausen",
      date: "26/07/24 20:30",
      imageUrl: "../../assets/euro.jpg",
    },
    {
      title: "Turska vs Srbija",
      stadium: "Benteler-Arena, Paderborn",
      date: "27/07/24 19:00",
      imageUrl: "../../assets/euro.jpg",
    },
    {
      title: "Bugarska vs Finska",
      stadium: "Mercedes-Benz Arena, Stuttgart",
      date: "28/07/24 18:00",
      imageUrl: "../../assets/euro.jpg",
    },
    {
      title: "Rumunija vs Luksemburg",
      stadium: "Volkswagen Arena, Wolfsburg",
      date: "29/07/24 17:30",
      imageUrl: "../../assets/euro.jpg",
    },
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

