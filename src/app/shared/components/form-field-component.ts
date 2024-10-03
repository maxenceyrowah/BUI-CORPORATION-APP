import { NgIf } from '@angular/common';
import { booleanAttribute, Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-field',
  standalone: true,
  template: `
    <div>
      <p class="mb-2">
        {{ label }}

        @if(fieldRequired) {
        <span class="text-red-500">*</span>
        }
      </p>
      <ng-content select="[field-content]"></ng-content>
    </div>
  `,
  imports: [NgIf],
})
export class FormFieldComponent {
  @Input() label: string = '';
  @Input({ transform: booleanAttribute }) fieldRequired = false;
}
