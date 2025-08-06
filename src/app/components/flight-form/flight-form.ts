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
  flightForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.flightForm = this.fb.group({
      flightNumber: ['', Validators.required],
      flightAirline: ['', Validators.required],
      flightOrigin: ['', Validators.required],
      flightDestination: ['', Validators.required],
      flightDepartureDate: ['', Validators.required],
      flightArrivalDate: ['', Validators.required],      
      flightDepartureTime: ['', Validators.required],
      flightArrivalTime: ['', Validators.required],
      flightTravelTime: ['', Validators.required],
      flightPrice: ['', Validators.required ]
    });
  }

  ngOnInit(): void {
    // Initialization logic if needed
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
