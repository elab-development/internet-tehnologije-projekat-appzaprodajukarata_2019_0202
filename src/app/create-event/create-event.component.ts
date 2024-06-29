import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Event } from '../models/event';
import { EventService } from '../services/event.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css'],
  providers: [DatePipe]
})
export class CreateEventComponent implements OnInit {
  eventForm: FormGroup;
  error: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private eventService: EventService,
    private router: Router,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.eventForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(255)]],
      stadium: ['', [Validators.required, Validators.maxLength(255)]],
      date: ['', [Validators.required]],
      time: ['', [Validators.required]]
    });
  }

  get formControls() {
    return this.eventForm.controls;
  }

  onSubmit() {
    console.log('Submit button clicked');
    if (this.eventForm.invalid) {
      return;
    }
    const formValue = this.eventForm.value;
    const formattedDate = this.datePipe.transform(formValue.date, 'dd.MM.yyyy');
    const newEvent = new Event(
      0, // Dummy ID, backend će dodeliti stvarni ID
      formValue.name,
      formValue.stadium,
      formattedDate || '',  // Datum u formatu dd.MM.yyyy
      formValue.time
    );
  
    this.eventService.createEvent(newEvent).subscribe(
      (response: any) => {
        console.log('Događaj uspešno kreiran.', response);
        this.eventForm.reset();  // Resetujemo formu nakon uspešnog čuvanja
        this.router.navigate(['/events']);  // Navigacija na listu događaja ili gde je potrebno
      },
      (error) => {
        console.error('Greška prilikom kreiranja događaja:', error);
        if (error.status === 422 && error.error) {
          this.error = this.getErrorMessage(error.error);  // Prikazujemo grešku ako je validacija na backend-u neuspešna
        } else {
          this.error = 'Došlo je do greške prilikom kreiranja događaja.';
        }
      }
    );
  }

  private getErrorMessage(errorResponse: any): string {
    let errorMessage = '';
    if (errorResponse.date && errorResponse.date.length > 0) {
      errorMessage += errorResponse.date[0] + ' ';
    }
    if (errorResponse.time && errorResponse.time.length > 0) {
      errorMessage += errorResponse.time[0];
    }
    return errorMessage.trim();
  }
}
