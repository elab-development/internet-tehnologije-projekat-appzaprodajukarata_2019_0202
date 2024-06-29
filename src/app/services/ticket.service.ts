// ticket.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private baseUrl = 'http://your-laravel-backend-url/api'; // Adjust this URL

  constructor(private http: HttpClient) {}

  purchaseTicket(userId: number, eventId: number, seatNumber: string, seatRow: string): Observable<any> {
    const url = `${this.baseUrl}/tickets`;
    const ticketData = { user_id: userId, event_id: eventId, seat_number: seatNumber, seat_row: seatRow };
    return this.http.post<any>(url, ticketData);
  }
}
