import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-date-dropdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './date-dropdown.html',
  styleUrl: './date-dropdown.css',
  providers: [{
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateDropdownComponent),
      multi: true}]
})

export class DateDropdownComponent implements ControlValueAccessor {

  /**
   * Input properties for the date dropdown component.
   */
  @Input() label: string = 'Date';

  /**
   * The id for the date dropdown component.
   */
  @Input() id: string = 'date-dropdown';

  /**
   * Whether the date dropdown is required.
   */
  @Input() isInvalid: boolean = false;

  /**
   * Error message to display when the date is invalid.
   */
  @Input() errorMessage: string = 'Please select a valid date';

  /**
   * Selected day from the dropdown.
   * This is a string representing the day (1-31).
   */
  selectedDay: string = '';

  /**
   * Selected month from the dropdown.
   * This is a string representing the month (1-12).
   */
  selectedMonth: string = '';

  /**
   * Selected year from the dropdown.
   * This is a string representing the year (e.g., '2023').
   */
  selectedYear: string = '';

  /**
   * Array of days from 1 to 31. This will be updated dynamically based on the selected month and year.
   */
  days: number[] = Array.from({ length: 31 }, (_, i) => i + 1);

  /**
   * Array of month names for the dropdown.
   */
  months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  /**
   * Array of years starting from the current year to the next 10 years.
   */
  years: number[] = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i);

  /**
   * Callbacks for ControlValueAccessor
   * This is used to propagate changes and to the parent form.
   * @param value The value to set in the date dropdown.
   */
  private onChange = (value: string) => {};

  /**
   * Callback for when the control is touched
   * This is used to indicate that the control has been interacted with.
   */
  private onTouched = () => {};


  /**
   * Constructor initializes the selected month and year to the current date.
   */
  constructor() {
    const today = new Date();
    this.selectedMonth = (today.getMonth() + 1).toString();
    this.selectedYear = today.getFullYear().toString();
    this.updateDaysForSelectedMonth();
  }

  /**
   * @param selectedDay The day selected from the dropdown.
   * @param event Event triggered when the day is changed.
   * Updates the selected day and calls updateValue to propagate changes.
   */
  onDayChange(event: Event): void {
    this.selectedDay = (event.target as HTMLSelectElement).value;
    this.updateValue();
  }

  /**
   * @param selectedMonth The month selected from the dropdown.
   * @param event Event triggered when the month is changed.
   * Updates the selected month, recalculates available days, and calls updateValue.
   */
  onMonthChange(event: Event): void {
    this.selectedMonth = (event.target as HTMLSelectElement).value;
    this.updateDaysForSelectedMonth(); // Update available days
    this.updateValue();
  }

  /**
   * @param selectedYear The year selected from the dropdown.
   * @param event Event triggered when the year is changed.
   * Updates the selected year, recalculates available days, and calls updateValue.
   */
  onYearChange(event: Event): void {
    this.selectedYear = (event.target as HTMLSelectElement).value;
    this.updateDaysForSelectedMonth(); // Update available days (for leap years)
    this.updateValue();
  }

  /**
   * Updates the days array based on the selected month and year.
   * This method ensures that the dropdown only shows valid days for the selected month/year.
   * If no month/year is selected, it defaults to showing all days from 1 to 31.
   * @param selectedMonth The month selected from the dropdown.
   * @param selectedYear The year selected from the dropdown.
   * @param daysInMonth The number of days in the selected month/year.
   * This is calculated using the Date object to ensure correct handling of leap years and month lengths
   */
  private updateDaysForSelectedMonth(): void {
    if (this.selectedMonth && this.selectedYear) {
      const daysInMonth = new Date(
        parseInt(this.selectedYear), 
        parseInt(this.selectedMonth), // JavaScript Date uses 0-11 for months, but our dropdown uses 1-12
        0 // Day 0 gives us the last day of the previous month
      ).getDate();
      
      this.days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
      
      if (parseInt(this.selectedDay) > daysInMonth) {
        this.selectedDay = '';
      }
    } else {
      this.days = Array.from({ length: 31 }, (_, i) => i + 1);
    }
  }

  /**
   * Updates the value of the control and calls the onChange callback.
   * This method formats the date as YYYY-MM-DD for compatibility with date inputs.
   * If any of the day, month, or year is not selected, it sets the value to an empty string.
   * It also calls the onTouched callback to indicate that the control has been interacted with.
   * @param selectedDay The day selected from the dropdown.
   * @param selectedMonth The month selected from the dropdown.
   * @param selectedYear The year selected from the dropdown.
   * @param formattedDate The formatted date string in YYYY-MM-DD format.
   */
  private updateValue(): void {
    if (this.selectedDay && this.selectedMonth && this.selectedYear) {
      // Format as YYYY-MM-DD for compatibility with date inputs
      const formattedDate = `${this.selectedYear}-${this.selectedMonth.padStart(2, '0')}-${this.selectedDay.padStart(2, '0')}`;
      this.onChange(formattedDate);
    } else {
      this.onChange('');
    }
    this.onTouched();
  }

  /**
   * Writes a value to the date dropdown.
   * This method is part of the ControlValueAccessor interface and is used to set the initial value of the control.
   * @param value The value to set in the date dropdown.
   * @param date The date value in string format (YYYY-MM-DD).
   * @param selectedDay The day part of the date.
   * @param selectedMonth The month part of the date.
   * @param selectedYear The year part of the date.
   * It parses the date string and sets the selected day, month, and year accordingly.
   * If the value is empty, it resets the selected day, month, and year to empty strings and resets the days array to show all days from 1 to 31.
   */
  writeValue(value: string): void {
    if (value) {
      const date = new Date(value);
      this.selectedDay = date.getDate().toString();
      this.selectedMonth = (date.getMonth() + 1).toString();
      this.selectedYear = date.getFullYear().toString();
      
      this.updateDaysForSelectedMonth();
    } else {
      this.selectedDay = '';
      this.selectedMonth = '';
      this.selectedYear = '';
      this.days = Array.from({ length: 31 }, (_, i) => i + 1); // Reset to full range
    }
  }

  /**
   * Registers a callback function that should be called when the control's value changes.
   * This method is part of the ControlValueAccessor interface and is used to propagate changes to the parent form.
   * @param fn The callback function to register.
   * @param value The value to set in the date dropdown.
   */
  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  /**
   * Registers a callback function that should be called when the control is touched.
   * This method is part of the ControlValueAccessor interface and is used to handle touch events.
   * @param fn The callback function to register.
   */
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  /**
   * Sets the disabled state of the control.
   * This method is part of the ControlValueAccessor interface and can be used to disable the control if needed.
   * @param isDisabled A boolean indicating whether the control should be disabled.
   */
  setDisabledState(isDisabled: boolean): void {
  }
}