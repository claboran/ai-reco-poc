import { ChangeDetectionStrategy, Component, HostBinding, input } from '@angular/core';
import { TProduct } from "../../shared/product.model";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'aireco-product-query-list-item',
  imports: [
    RouterLink,
  ],
  template: `
    <div class="w-full flex flex-col justify-start border border-white rounded-md p-2 lg:p-4">
      <div>{{ product().category }}</div>
      <div class="divider w-full"></div>
      <div>{{ product().description }}</div>
      <div class="mt-3">
        <a [routerLink]="['/products', product().id]" class="btn btn-primary btn-sm">View product</a>
      </div>
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductQueryListItemComponent {
  @HostBinding('class')
  readonly classes = ['w-full'];
  product = input.required<TProduct>();
}
