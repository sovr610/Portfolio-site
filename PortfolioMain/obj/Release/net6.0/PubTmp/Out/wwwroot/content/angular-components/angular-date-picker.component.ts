// src/angular-date-picker.component.ts
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-angular-date-picker',
  template: `
    <div class="cyberpunk-date-picker">
      <input type="date" (change)="onDateChange($event)" [value]="currentDate">
      <div class="neon-glow"></div>
    </div>
  `,
  styles: [`
    .cyberpunk-date-picker {
      position: relative;
      width: 200px;
    }
    input[type="date"] {
      width: 100%;
      padding: 10px;
      background-color: #0a0a0a;
      border: 2px solid #00ff00;
      color: #00ff00;
      font-family: 'Courier New', monospace;
      font-size: 16px;
      outline: none;
    }
    input[type="date"]::-webkit-calendar-picker-indicator {
      background-color: #00ff00;
      cursor: pointer;
    }
    .neon-glow {
      position: absolute;
      top: -5px;
      left: -5px;
      right: -5px;
      bottom: -5px;
      border: 2px solid #00ff00;
      filter: blur(5px);
      pointer-events: none;
    }
  `]
})
export class AngularDatePickerComponent {
  @Output() dateChange = new EventEmitter<string>();
  currentDate: string = new Date().toISOString().split('T')[0];

  onDateChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.dateChange.emit(input.value);
  }
}