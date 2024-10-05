import { Component } from '@angular/core';

@Component({
  selector: 'app-public-layout',
  standalone: true,
  imports: [],
  template: `
    <div class="md:py-[13rem] py-5">
      <div class="flex h-full items-center justify-center">
        <div
          class="rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-900 flex-col flex h-full items-center justify-center sm:px-4"
        >
          <div class="flex h-full flex-col justify-center gap-4 p-6">
            <div
              class="left-0 right-0 inline-block border-gray-200 px-2 py-2.5 sm:px-4"
            >
              <ng-content select="[field-content]"></ng-content>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class PublicLayoutComponent {}
