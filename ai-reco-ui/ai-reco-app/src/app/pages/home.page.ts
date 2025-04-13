import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { HeaderComponent } from "../components/header.component";
import { FooterComponent } from "../components/footer.component";
import { RouterOutlet } from "@angular/router";
import { RecommendationStore } from "../common/recommendation.store";

@Component({
  selector: 'aireco-home-layout',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    RouterOutlet,
  ],
  template: `
    <div class="flex flex-col h-screen">
      <div class="sticky-header w-full">
        <aireco-header (reset)="onClear()"
                       (submitQuery)="onSubmit($event)">
        </aireco-header>
      </div>
      <div class="container flex-1 mb-3 lg:mb-5 mx-auto">
        <router-outlet></router-outlet>
      </div>
      <aireco-footer/>
    </div>
  `,
  styles: [
    `.sticky-header {
      position: sticky;
      top: 0;
      z-index: 1000;
    }`,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomeLayoutComponent {
  readonly store = inject(RecommendationStore);

  onClear() {
    this.store.resetRecommendation();
  }

  onSubmit(query: string) {
    this.store.queryRecommendations({ query });
  }
}
