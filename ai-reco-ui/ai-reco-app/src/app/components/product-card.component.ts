import { ChangeDetectionStrategy, Component, HostBinding, input } from '@angular/core';
import { TCategoryDescription } from "../../shared/product.model";

@Component({
  selector: 'aireco-product-card',
  imports: [],
  template: `
    <div class="card bg-neutral text-neutral-content w-full p-2 lg:p-5">
      <div class="card-body">
        <h2 class="card-title uppercase">{{ data().category }}</h2>
        <div class="divider"></div>
        <p>
          {{ data().description }}
        </p>
      </div>
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {
  @HostBinding('class')
  readonly classes = ['w-full'];
  data = input.required<TCategoryDescription>();
}
