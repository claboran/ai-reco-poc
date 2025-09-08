import { ChangeDetectionStrategy, Component, computed, inject, output, signal } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";

export type TQuery = {
  query: FormControl<string>;
};

@Component({
  selector: 'aireco-search-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="fg" noValidate class="w-full max-w-3xl">
      <div class="relative">
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
          @if (queryValue()) {
            <button
              type="button"
              class="btn btn-ghost join-item"
              (click)="clear()">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clip-rule="evenodd" />
              </svg>
            </button>
          }
        </div>
      </div>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchFormComponent {
  #fb = inject(NonNullableFormBuilder);
  #fg = this.#fb.group<TQuery>({
    query: this.#fb.control('', [Validators.minLength(3)]),
  });

  // expose a computed signal of the current query value for control flow
  readonly queryValue = computed(() => this.#fg.get('query')?.value ?? '');

  reset = output<void>();
  submitQuery = output<string>();

  get fg(): FormGroup<TQuery> {
    return this.#fg;
  }

  submit(): void {
    const q = this.#fg.get('query')?.value ?? '';
    if (this.fg.valid && q) {
      this.submitQuery.emit(q);
    }
  }

  clear(): void {
    this.#fg.get('query')?.setValue('');
    this.reset.emit();
  }
}
