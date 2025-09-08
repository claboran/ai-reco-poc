import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { ProductQueryListComponent } from "../../components/product-query-list.component";
import { ChatComponent } from "../../components/chat.component";
import { RecommendationStore } from "../../common/recommendation.store";

@Component({
  standalone: true,
  imports: [
    ChatComponent,
    ProductQueryListComponent,
  ],
  template: `
    <section class="flex flex-col h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)] lg:h-[calc(100vh-6rem)] px-4 md:px-3 lg:px-2 xl:px-0 gap-4">
      <!-- Chat on top -->
      <ai-reco-chat />

      <!-- Scrollable product list area at the bottom -->
      <div class="min-h-0 flex-1 overflow-auto">
        <aireco-product-query-list [products]="products()" />
      </div>
    </section>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ClassicRecommenderPage {
  readonly store = inject(RecommendationStore);
  readonly products = this.store.recommendations;
}
