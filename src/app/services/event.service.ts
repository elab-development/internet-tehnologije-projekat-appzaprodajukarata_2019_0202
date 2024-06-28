import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Event } from '../models/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private apiUrl = 'http://127.0.0.1:8000/api/events'; // Replace with the actual URL of your API

  constructor(private http: HttpClient) { }

  getEvents(): Observable<Event[]> {
    return this.http.get<{ data: Event[] }>(this.apiUrl).pipe(
      map(response => response.data)
    );
  }

  createEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(this.apiUrl, event);
  }
}
