import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importuj Router
import { EventService } from '../services/event.service';
import { Event } from '../models/event';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  events: Event[] = [];
  paginatedEvents: Event[] = [];
  currentPage = 1;
  pageSize = 8;
  totalPages = 0;

  constructor(private eventService: EventService, private router: Router) { } // Dodaj Router u konstruktor

  ngOnInit(): void {
    this.fetchEvents();
  }

  fetchEvents(): void {
    this.eventService.getEvents().subscribe((data: Event[]) => {
      this.events = data;
      this.totalPages = Math.ceil(this.events.length / this.pageSize);
      this.updatePaginatedEvents();
    });
  }

  updatePaginatedEvents(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedEvents = this.events.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedEvents();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedEvents();
    }
  }

  navigateToTicketComponent(): void {
    this.router.navigate(['/tickets']); // Implementacija navigacije do komponente za kupovinu karata
  }
}
