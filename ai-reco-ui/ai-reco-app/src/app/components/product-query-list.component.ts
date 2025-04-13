import { ChangeDetectionStrategy, Component, HostBinding, input } from '@angular/core';
import { TProduct } from "../../shared/product.model";
import { ProductQueryListItemComponent } from "./product-query-list-item.component";

@Component({
  selector: 'aireco-product-query-list',
  imports: [
    ProductQueryListItemComponent
  ],
  template: `
    <div class="w-full bg-neutral text-neutral-content p-4 lg:p-6 mt-10 lg:mt-24">
      @for (product of products(); track product.id) {
        <aireco-product-query-list-item [product]="product"></aireco-product-query-list-item>
      }
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductQueryListComponent {
  @HostBinding('class')
  readonly classes = ['w-full'];
  products = input.required<TProduct[]>();
}
