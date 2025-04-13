
 import { Component, computed, HostBinding, Signal } from '@angular/core';
 import { toSignal } from "@angular/core/rxjs-interop";
 import { injectLoad } from "@analogjs/router";
 import { load } from "./[productId].server";
 import { TCategoryDescription, TProduct } from "../../../shared/product.model";
 import { ProductCardComponent } from "../../components/product-card.component";



@Component({
  standalone: true,
  imports: [
    ProductCardComponent
  ],
  template: `
    <div class="mt-10 lg:mt-24">
      @if (data().product !== null) {
        <aireco-product-card [data]="categoryDescription()"></aireco-product-card>
      } @else {
        <div role="alert" class="alert alert-warning">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>Product not found!</span>
        </div>
      }
    </div>
  `,
})
export default class ProductPage {
  @HostBinding('class')
  readonly classes = ['w-full'];

  data: Signal<{loaded: boolean, product: TProduct | null}> = toSignal(injectLoad<typeof load>(), { requireSync: true});
  categoryDescription = computed(() => ({
    description: this.data()?.product?.description,
    category: this.data()?.product?.category,
  } as TCategoryDescription));
}
