import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-ticket-purchase',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent {
  ticketForm: FormGroup;

  selectedRow: string = '';
  selectedSeat: number = 0;
  cardNumber: string = '';
  cardHolderName: string = '';
  expiryDate: string = '';
  cvc: string = '';

  rowOptions: string[] = ['A', 'B', 'C', 'D', 'E', 'F'];
  seatOptions: number[] = Array.from({ length: 20 }, (_, i) => i + 1);

  purchasedTickets: { row: string, seat: number }[] = [];
  brojKupljenihKarata: number = 0;

  constructor(private fb: FormBuilder) {
    this.ticketForm = this.fb.group({
      selectedRow: ['', Validators.required],
      selectedSeat: ['', [Validators.required, Validators.min(1), Validators.max(20)]],
      cardNumber: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      cardHolderName: ['', Validators.required],
      expiryDate: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/), this.expiryDateValidator]],
      cvc: ['', [Validators.required, Validators.maxLength(3), Validators.minLength(3)]]
    });
  }

  purchaseTicket() {
    if (this.ticketForm.valid) {
      const selectedTicket = {
        row: this.ticketForm.get('selectedRow')?.value,
        seat: this.ticketForm.get('selectedSeat')?.value
      };

      const alreadyPurchased = this.purchasedTickets.some(ticket =>
        ticket.row === selectedTicket.row && ticket.seat === selectedTicket.seat
      );

      if (alreadyPurchased) {
        alert('Već ste kupili kartu za ovaj red i broj sedišta.');
      } else {
        this.purchasedTickets.push(selectedTicket);
        this.brojKupljenihKarata++;
        this.ticketForm.reset();
        console.log('Kupljena karta:', selectedTicket);
        console.log('Sve kupljene karte:', this.purchasedTickets);
      }
    } else {
      alert('Molimo vas da popunite ispravno sva polja.');
    }
  }

  expiryDateValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value) {
      const [month, year] = value.split('/');
      if (parseInt(month, 10) > 12) {
        return { invalidMonth: true };
      }
    }
    return null;
  }
}
