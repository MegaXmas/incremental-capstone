import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BaseFormControl } from '../base-form-control';

@Component({
  selector: 'app-time-dropdown',
  imports: [CommonModule],
  templateUrl: './time-dropdown.html',
  styleUrls: ['./time-dropdown.css', '../form-styles.css'],
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TimeDropdownComponent),
      multi: true
    }
  ]
})

export class TimeDropdownComponent extends BaseFormControl {

  /**
   * Input properties for the time dropdown component.
   */
  @Input() label: string = 'Time';


  /**
   * The id for the time dropdown component.
   */
  @Input() id: string = 'time-dropdown';


  /**
   * Selected hours from the dropdown.
   */
  selectedHours: string = '';

  
  /**
   * Selected minutes from the dropdown.
   */
  selectedMinutes: string = '';


  /**
   * Selected period (AM/PM) from the dropdown.
   */
  selectedPeriod: string = '';


  /**
   * Array of hours from 1 to 12 for the dropdown.
   */
  hours: number[] = Array.from({ length: 24 }, (_, i) => i);


  /**
   * Array of minutes from 0 to 55 in 5-minute increments for the dropdown.
   */
  minutes: number[] = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];


  /**
   * @param event The change event from the hours dropdown.
   * Updates the selected hours and calls updateFormValue to propagate changes.
   */
  onHoursChange(event: Event): void {
    this.selectedHours = (event.target as HTMLSelectElement).value;
    this.updateFormValue();
  }


  /**
   * @param event The change event from the minutes dropdown.
   * Updates the selected minutes and calls updateFormValue to propagate changes.
   */
  onMinutesChange(event: Event): void {
    this.selectedMinutes = (event.target as HTMLSelectElement).value;
    this.updateFormValue();
  }


  /**
   * Method to update the value of the control and notify the parent form.
   * @param formattedTime The formatted time string in 'HH:MM' format.
   * If the selected hours, minutes, and period are valid,
   * it formats the time as 'HH:MM' and calls the base class method to update the value.
   * If any of the selected values are empty, it resets the value to an empty string
   * and calls the base class method to update the value.
   * This method is used to ensure that the form control's value is updated correctly
   */
  private updateFormValue(): void {
    if (this.selectedHours && this.selectedMinutes !== '' && this.selectedPeriod) {
      // Convert to 24-hour format for consistency
      let hour = parseInt(this.selectedHours);
      if (this.selectedPeriod === 'PM' && hour !== 12) {
        hour += 12;
      } else if (this.selectedPeriod === 'AM' && hour === 12) {
        hour = 0;
      }
      
      const formattedTime = `${hour.toString().padStart(2, '0')}:${this.selectedMinutes.toString().padStart(2, '0')}`;
      this.updateValue(formattedTime);
    } else {
      this.updateValue('');
    }
  }

  /**
   * Required implementation from base class.
   * Writes a value to the control.
   * @param value The value to write to the control in 'HH:MM' format.
   * If the value is empty, it resets the selected values to empty strings.
   * If the value is provided, it parses the hours, minutes, and period,
   * and updates the selectedHours, selectedMinutes, and selectedPeriod accordingly.
   */
  writeValue(value: string): void {
    if (value) {
      const [hourStr, minuteStr] = value.split(':');
      let hour = parseInt(hourStr);
      
      // Convert from 24-hour to 12-hour format
      if (hour === 0) {
        this.selectedHours = '12';
        this.selectedPeriod = 'AM';
      } else if (hour < 12) {
        this.selectedHours = hour.toString();
        this.selectedPeriod = 'AM';
      } else if (hour === 12) {
        this.selectedHours = '12';
        this.selectedPeriod = 'PM';
      } else {
        this.selectedHours = (hour - 12).toString();
        this.selectedPeriod = 'PM';
      }
      
      this.selectedMinutes = minuteStr;
    } else {
      this.selectedHours = '';
      this.selectedMinutes = '';
      this.selectedPeriod = '';
    }
  }

}
