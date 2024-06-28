import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EventService } from '../services/event.service';
import { Event } from '../models/event';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent {
  constructor(private eventService: EventService) {}

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const newEvent: Event = {
      id: 0, // Ovde možete generisati ID, ili Laravel može automatski dodeliti
      name: form.value.name,
      stadium: form.value.stadium,
      date: form.value.date,
      time: form.value.time
    };

    this.eventService.createEvent(newEvent).subscribe(
      response => {
        console.log('Događaj uspešno kreiran:', response);
        form.resetForm();
      },
      error => {
        console.error('Greška prilikom kreiranja događaja:', error);
      }
    );
  }
}
