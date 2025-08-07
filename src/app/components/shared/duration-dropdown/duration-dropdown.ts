import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BaseFormControl } from '../base-form-control';

@Component({
  selector: 'app-duration-dropdown',
  imports: [ CommonModule ],
  templateUrl: './duration-dropdown.html',
  styleUrls: ['./duration-dropdown.css', '../form-styles.css'],
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DurationDropdownComponent),
      multi: true
    }
  ]
})

export class DurationDropdownComponent extends BaseFormControl {
  @Input() label: string = 'Duration';
  @Input() id: string = 'duration-dropdown';
  @Input() maxHours: number = 24; // Allow customization of max hours

  selectedHours: string = '';
  selectedMinutes: string = '';

  hours: number[] = [];
  minutes: number[] = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

  ngOnInit() {
    // Generate hours array based on maxHours input
    this.hours = Array.from({ length: this.maxHours + 1 }, (_, i) => i);
  }

  onHoursChange(event: Event): void {
    this.selectedHours = (event.target as HTMLSelectElement).value;
    this.updateFormValue();
  }

  onMinutesChange(event: Event): void {
    this.selectedMinutes = (event.target as HTMLSelectElement).value;
    this.updateFormValue();
  }

  private updateFormValue(): void {
    if (this.selectedHours !== '' && this.selectedMinutes !== '') {
      // Format as "Xh Ym" (e.g., "2h 30m")
      const formattedDuration = `${this.selectedHours}h ${this.selectedMinutes}m`;
      this.updateValue(formattedDuration);
    } else {
      this.updateValue('');
    }
  }

  // ControlValueAccessor implementation
  writeValue(value: string): void {
    if (value) {
      // Parse "Xh Ym" format
      const hourMatch = value.match(/(\d+)h/);
      const minuteMatch = value.match(/(\d+)m/);
      
      this.selectedHours = hourMatch ? hourMatch[1] : '';
      this.selectedMinutes = minuteMatch ? minuteMatch[1] : '';
    } else {
      this.selectedHours = '';
      this.selectedMinutes = '';
    }
  }
}
