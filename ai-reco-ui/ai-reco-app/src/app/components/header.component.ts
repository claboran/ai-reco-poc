import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { NgIf, NgOptimizedImage } from "@angular/common";
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { RecommendationStore } from "../common/recommendation.store";

type TQuery = {
  query: FormControl<string>;
};

@Component({
  selector: 'aireco-header',
  imports: [
    NgOptimizedImage,
    ReactiveFormsModule,
    NgIf,
  ],
  template: `
    <div class="w-full bg-gradient-to-t from-base-100 to-secondary border-b-2 border-neutral">
      <div class="container mx-auto py-4 px-4 sm:px-2 lg:px-3 xl:px-0">
        <div class="flex flex-col">
          <div class="flex items-center">
              <img ngSrc="assets/header-banner.svg" alt="DevFest" [style.position]="'relative'" fill >
          </div>
          <div class="flex justify-center w-full">
            <form [formGroup]="fg" noValidate class="w-full max-w-3xl">
              <div class="relative">
                <div class="mb-2">
                  <button
                    type="button"
                    class="btn btn-sm btn-outline"
                    (click)="backToSearch()">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 mr-1">
                      <path fill-rule="evenodd" d="M7.28 7.72a.75.75 0 010 1.06l-2.47 2.47H21a.75.75 0 010 1.5H4.81l2.47 2.47a.75.75 0 11-1.06 1.06l-3.75-3.75a.75.75 0 010-1.06l3.75-3.75a.75.75 0 011.06 0z" clip-rule="evenodd" />
                    </svg>
                    Back to search results
                  </button>
                </div>
                <div class="join w-full">
                  <input
                    type="text"
                    class="input input-bordered join-item flex-grow"
                    placeholder="Search"
                    formControlName="query"
                    (keyup.enter)="submit()"/>
                  <button
                    type="submit"
                    class="btn btn-primary join-item"
                    [disabled]="!fg.valid"
                    (click)="submit()">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                      <path fill-rule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clip-rule="evenodd" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    class="btn btn-ghost join-item"
                    *ngIf="fg.get('query')?.value"
                    (click)="clear()">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                      <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  #fb = inject(NonNullableFormBuilder);
  #fg = this.#fb.group<TQuery>({
    query: this.#fb.control('', [Validators.minLength(3)]),
  });
  readonly #router = inject(Router);

  reset = output<void>();
  submitQuery = output<string>();

  get fg(): FormGroup<TQuery> {
    return this.#fg;
  }

  submit(): void {
    if (this.fg.valid && this.fg.value.query) {
      this.submitQuery.emit(this.fg.value.query);
    }
  }

  clear(): void {
    this.#fg.get('query')?.setValue('');
    this.reset.emit();
  }
  backToSearch(): void {
    this.#router.navigate(['/']);
  }
}
