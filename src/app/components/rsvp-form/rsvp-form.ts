import { CommonModule } from '@angular/common';
import { Component, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
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
      attending: [null, Validators.required],
      guestCount: [1, [Validators.required, Validators.min(1)]],
      names: this.fb.array([this.fb.control('', Validators.required)]), // Dynamisches Namens-Array startet mit 1 Feld
      accommodation: [''],
      dietary: [''],
      songRequest: [''],
      message: [''],
      website: [''] 
    });

    // Signal zur Überwachung, ob "Ja" oder "Nein" gewählt wurde
    this.isAttending = toSignal(
      this.rsvpForm.get('attending')!.valueChanges.pipe(
        startWith(null),
        map(val => val === 'yes')
      ),
      { initialValue: false }
    );

    // Überwachung der Personenanzahl, um die Namensfelder dynamisch anzupassen
    this.rsvpForm.get('guestCount')!.valueChanges.subscribe(count => {
      if (this.rsvpForm.get('attending')?.value === 'yes') {
        this.updateNameFields(Number(count));
      }
    });

    // Überwachung der Zu-/Absage, um die Felder zurückzusetzen
    this.rsvpForm.get('attending')!.valueChanges.subscribe(val => {
      const accControl = this.rsvpForm.get('accommodation');
      if (val === 'yes') {
        accControl?.setValidators([Validators.required]);
        this.updateNameFields(Number(this.rsvpForm.get('guestCount')?.value || 1));
      } else {
        accControl?.clearValidators();
        accControl?.setValue('');
        this.updateNameFields(1); // Bei Absage reicht 1 Namensfeld
      }
      accControl?.updateValueAndValidity();
    });
  }

  // Hilfsmethode, um das FormArray bequem im HTML zu nutzen
  get namesArray(): FormArray {
    return this.rsvpForm.get('names') as FormArray;
  }

  get f() { return this.rsvpForm.controls; }

  // Generiert die exakte Anzahl an Pflicht-Namensfeldern
  updateNameFields(count: number) {
    const currentLength = this.namesArray.length;
    if (currentLength < count) {
      for (let i = currentLength; i < count; i++) {
        this.namesArray.push(this.fb.control('', Validators.required));
      }
    } else if (currentLength > count) {
      for (let i = currentLength; i > count; i--) {
        this.namesArray.removeAt(i - 1);
      }
    }
  }

  onSubmit() {
    if (this.rsvpForm.invalid) {
      this.rsvpForm.markAllAsTouched();
      return;
    }

    if (this.rsvpForm.get('website')?.value) {
      console.log('Spam Bot erkannt!');
      this.isSubmitted = true; 
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const formData = { ...this.rsvpForm.value };
    delete formData.website;

    // Wenn abgesagt wird, senden wir Personenanzahl 0 an dein Google Sheet
    if (formData.attending === 'no') {
      formData.guestCount = 0;
    }

    this.rsvpService.sendRsvp(formData).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.isSubmitted = true;
        this.rsvpForm.reset();
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Fehler beim Senden. Bitte versuche es später noch einmal.';
      }
    });
  }
}