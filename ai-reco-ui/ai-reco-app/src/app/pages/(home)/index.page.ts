
 import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
 import { RecommendationStore } from "../../common/recommendation.store";
 import { ProductQueryListComponent } from "../../components/product-query-list.component";



@Component({
  selector: 'aireco-home-page',
  standalone: true,
  imports: [
    ProductQueryListComponent
  ],
  template: `
    <div class="text-white text-xl md:text-2xl lg:text-3xl mt-3 md:mt-4 lg:mt-5 px-4 md:px-3 lg:px-2 xl:px-0 animate__animated animate__backInRight">
     @if (store.recommendations().length > 0) {
       <aireco-product-query-list [products]="store.recommendations()"></aireco-product-query-list>
     }
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomePage {
  readonly store = inject(RecommendationStore);
}
