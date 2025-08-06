import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-flight-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './flight-form.html',
  styleUrl: './flight-form.css'
})
export class FlightFormComponent implements OnInit {
  flightForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.flightForm = this.fb.group({
      flightNumber: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
      flightAirline: ['', [Validators.required, Validators.minLength(2)]],
      flightOrigin: ['', [Validators.required, Validators.minLength(2)]],
      flightDestination: ['', [Validators.required, Validators.minLength(2)]],
      flightDepartureDate: ['', Validators.required],
      flightArrivalDate: ['', Validators.required],
      flightDepatureTime: ['', Validators.required],
      flightArrivalTime: ['', Validators.required],
      flightTravelTime: ['', [Validators.required, Validators.min(1)]],
      flightPrice: ['', [Validators.required, Validators.min(0)]],
    });

    console.log('Initial form state:', {
      dirty: this.flightForm.dirty,
      pristine: this.flightForm.pristine,
      valid: this.flightForm.valid
    });
  }

  onSubmit(): void {
    if (this.flightForm.valid) {
      console.log('Flight details submitted:', this.flightForm.value);
      // Handle form submission logic here
    } else {
      console.error('Form is invalid');
    }
  }

}
