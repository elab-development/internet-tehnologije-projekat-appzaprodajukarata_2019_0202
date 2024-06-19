import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ticket-purchase',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent {
  ticketForm: FormGroup; // Deklaracija bez inicijalizacije

  selectedRow: string = '';
  selectedSeat: number = 0;
  cardNumber: string = '';
  cardHolderName: string = '';
  expiryDate: string = '';
  cvc: string = '';

  rowOptions: string[] = ['A', 'B', 'C', 'D', 'E', 'F'];
  seatOptions: number[] = Array.from({ length: 20 }, (_, i) => i + 1);

  constructor(private fb: FormBuilder) {
    // Inicijalizacija ticketForm u konstruktoru
    this.ticketForm = this.fb.group({
      selectedRow: ['', Validators.required],
      selectedSeat: ['', [Validators.required, Validators.min(1), Validators.max(20)]],
      cardNumber: ['', Validators.required],
      cardHolderName: ['', Validators.required],
      expiryDate: ['', Validators.required],
      cvc: ['', Validators.required]
    });
  }

  purchaseTicket() {
    if (this.ticketForm.valid) {
      console.log('Kupljena karta:', this.ticketForm.value);
      // Dodatna logika za slanje podataka na server ili dalju obradu
    } else {
      console.error('Forma nije validna. Molimo proverite unos.');
    }
  }
}


