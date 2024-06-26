import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Event } from '../models/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private apiUrl = 'http://127.0.0.1:8000/api/events'; // zameni sa stvarnim URL-om tvog API-ja

  constructor(private http: HttpClient) { }

  getEvents(): Observable<Event[]> {
    return this.http.get<{ data: Event[] }>(this.apiUrl).pipe(
      map(response => response.data)
    );
  }
}
