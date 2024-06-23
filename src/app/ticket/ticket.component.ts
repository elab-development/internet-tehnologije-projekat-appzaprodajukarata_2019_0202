import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ticket-purchase',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent {
  ticketForm: FormGroup;
  brojKupljenihKarata: number = 0;

  selectedRow: string = '';
  selectedSeat: number = 0;
  cardNumber: string = '';
  cardHolderName: string = '';
  expiryDate: string = '';
  cvc: string = '';

  rowOptions: string[] = ['A', 'B', 'C', 'D', 'E', 'F'];
  seatOptions: number[] = Array.from({ length: 20 }, (_, i) => i + 1);
  purchasedTickets: { row: string, seat: number }[] = [];
  

  // Proveri da li je odabrana karta već kupljena

  constructor(private fb: FormBuilder) {
    this.ticketForm = this.fb.group({
      selectedRow: ['', Validators.required],
      selectedSeat: ['', Validators.required],
      cardNumber: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      cardHolderName: ['', Validators.required],
      expiryDate: ['', Validators.required],
      cvc: ['', Validators.required]
    });
  }

  purchaseTicket() {
    if (this.ticketForm.valid) {
      const selectedTicket = { row: this.selectedRow, seat: this.selectedSeat };

      // Proveri da li je odabrana karta već kupljena
       const alreadyPurchased = this.purchasedTickets.some(ticket =>
        ticket.row === selectedTicket.row && ticket.seat === selectedTicket.seat
      );
    

      if (alreadyPurchased) {
        alert('Već ste kupili ovu kartu.');
      } else {
        // Dodaj odabranu kartu u niz kupljenih karata
        this.purchasedTickets.push(selectedTicket);
        this.brojKupljenihKarata++;
        // Resetuj formu nakon uspešne kupovine
        this.ticketForm.reset();
      }
    } else {
      // Ukoliko forma nije validna, možete dodati dodatne provere ili poruke korisniku
      alert('Molimo vas da popunite ispravno sva polja.');
    }
  }
}
