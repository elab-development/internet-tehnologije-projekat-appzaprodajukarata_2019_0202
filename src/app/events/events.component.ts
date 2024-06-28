import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../services/event.service';
import { Event } from '../models/event';
import { AuthService } from '../services/auth.service';

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
  isLoggedIn = false;
  searchText = '';
  sortOption = 'name'; // Default sort option

  constructor(private eventService: EventService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.fetchEvents();
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  fetchEvents(): void {
    this.eventService.getEvents().subscribe((data: Event[]) => {
      this.events = data;
      this.totalPages = Math.ceil(this.events.length / this.pageSize);
      this.updatePaginatedEvents();
    });
  }

  updatePaginatedEvents(): void {
    // Apply search filter
    let filteredEvents = this.events.filter(event =>
      event.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
      event.stadium.toLowerCase().includes(this.searchText.toLowerCase())
    );
  
    // Apply sorting
    filteredEvents.sort((a, b) => {
      if (this.sortOption === 'name') {
        return a.name.localeCompare(b.name);
      } else if (this.sortOption === 'date') {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      } else if (this.sortOption === 'stadium') {
        return a.stadium.localeCompare(b.stadium);
      }
      return 0;
    });
  
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedEvents = filteredEvents.slice(startIndex, endIndex);
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
    this.router.navigate(['/tickets']);
  }

  applySearch(): void {
    this.currentPage = 1; // Reset to the first page when searching
    this.updatePaginatedEvents();
  }

  applySort(): void {
    this.updatePaginatedEvents();
  }
}
