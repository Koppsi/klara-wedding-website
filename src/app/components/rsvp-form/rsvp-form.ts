import { CommonModule } from '@angular/common';
import { Component, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { map, startWith } from 'rxjs';
import { Rsvp } from '../../service/rsvp';

@Component({
  selector: 'app-rsvp-form',
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './rsvp-form.html',
  styleUrl: './rsvp-form.scss',
})
export class RsvpForm {
  rsvpForm: FormGroup;
  isSubmitted = false;
  isLoading = false;
  errorMessage = '';

  isAttending: Signal<boolean>;

constructor(
    private fb: FormBuilder, 
    private rsvpService: Rsvp
  ) {
    this.rsvpForm = this.fb.group({
      name: ['', Validators.required],
      attending: [null, Validators.required],
      guestCount: [1, [Validators.required, Validators.min(1)]],
      dietary: [''],
      songRequest: [''],
      message: [''],
      website: [''] 
    });

    this.isAttending = toSignal(
      this.rsvpForm.get('attending')!.valueChanges.pipe(
        startWith(null),
        map(val => val === 'yes')
      ),
      { initialValue: false }
    );
  }

  get f() { return this.rsvpForm.controls; }

  onSubmit() {
    // 1. Validierung prüfen
    if (this.rsvpForm.invalid) {
      this.rsvpForm.markAllAsTouched();
      return;
    }

    // 2. HONEYPOT PRÜFUNG (Spam-Schutz)
    // Wenn in diesem Feld etwas steht, ist es ein Bot!
    if (this.rsvpForm.get('website')?.value) {
      console.log('Spam Bot erkannt! Sende keine Daten.');
      // Wir tun so, als ob es geklappt hat, damit der Bot verschwindet
      this.isSubmitted = true; 
      return;
    }

    // 3. Echtes Senden (nur wenn Honeypot leer ist)
    this.isLoading = true;
    this.errorMessage = '';

    // Wir senden nur die Nutzdaten (ohne das Honeypot-Feld)
    const formData = { ...this.rsvpForm.value };
    delete formData.website; // Das leere Feld brauchen wir nicht in Google Sheets

    this.rsvpService.sendRsvp(formData).subscribe({
      next: (res) => {
        console.log('Erfolg:', res);
        this.isLoading = false;
        this.isSubmitted = true;
        this.rsvpForm.reset();
      },
      error: (err) => {
        console.error('Fehler:', err);
        this.isLoading = false;
        this.errorMessage = 'Fehler beim Senden. Bitte versuche es später noch einmal.';
      }
    });
  }

}
