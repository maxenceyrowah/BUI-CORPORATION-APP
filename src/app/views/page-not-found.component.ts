import { Component } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  template: `
    <div class="bg-gray-50 w-full">
      <div class="min-h-screen flex flex-grow items-center justify-center">
        <div class="rounded-lg bg-white p-8 text-center shadow-xl">
          <h1 class="mb-4 text-4xl font-bold">404</h1>
          <p class="text-gray-600">
            Oups ! La page que vous recherchez n'a pas pu être trouvée.
          </p>
          <a
            href="/"
            class="mt-4 inline-block
                        rounded bg-blue-500 text-white px-4 py-2 font-semibold hover:bg-blue-300 hover:text-white"
          >
            Retourner à l'accueil
          </a>
        </div>
      </div>
    </div>
  `,
})
export default class PageNotFoundComponent {}
