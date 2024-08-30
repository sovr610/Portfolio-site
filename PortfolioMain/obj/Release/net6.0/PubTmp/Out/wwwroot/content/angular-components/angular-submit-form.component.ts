// src/angular-submit-form.component.ts
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-angular-submit-form',
  template: `
    <form (ngSubmit)="onSubmit()" #form="ngForm" class="cyberpunk-form">
      <div class="form-group">
        <label for="fullName">Full Name</label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          [(ngModel)]="formData.fullName"
          required
        >
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          [(ngModel)]="formData.email"
          required
        >
      </div>
      <div class="form-group">
        <label for="phone">Phone Number</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          [(ngModel)]="formData.phone"
          required
        >
      </div>
      <div class="form-group">
        <label for="message">Message</label>
        <textarea
          id="message"
          name="message"
          [(ngModel)]="formData.message"
          required
        ></textarea>
      </div>
      <button
        type="submit"
        [class.hover]="isHovered"
        (mouseenter)="isHovered = true"
        (mouseleave)="isHovered = false"
      >
        Submit
      </button>
    </form>
  `,
  styles: [`
    .cyberpunk-form {
      max-width: 400px;
      padding: 20px;
      background-color: #0a0a0a;
      border: 2px solid #00ff00;
      box-shadow: 0 0 10px #00ff00;
      font-family: 'Courier New', monospace;
      color: #00ff00;
    }
    .form-group {
      margin-bottom: 20px;
    }
    label {
      display: block;
      margin-bottom: 5px;
      font-size: 14px;
    }
    input, textarea {
      width: 100%;
      padding: 8px;
      background-color: #1a1a1a;
      border: 1px solid #00ff00;
      color: #00ff00;
      font-size: 16px;
      outline: none;
    }
    textarea {
      min-height: 100px;
    }
    button {
      padding: 10px 20px;
      background-color: #00ff00;
      color: #0a0a0a;
      border: none;
      cursor: pointer;
      font-size: 16px;
      font-weight: bold;
      text-transform: uppercase;
      transition: all 0.3s ease;
    }
    button.hover {
      background-color: #0a0a0a;
      color: #00ff00;
      box-shadow: 0 0 10px #00ff00;
    }
  `]
})
export class AngularSubmitFormComponent {
  @Output() formSubmit = new EventEmitter<any>();

  formData = {
    fullName: '',
    email: '',
    phone: '',
    message: ''
  };

  isHovered = false;

  onSubmit() {
    this.formSubmit.emit(this.formData);
  }
}