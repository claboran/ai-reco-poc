import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgOptimizedImage } from "@angular/common";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'aireco-header',
  imports: [
    NgOptimizedImage,
    RouterLink,
  ],
  template: `
    <div class="w-full bg-gradient-to-t from-base-100 to-secondary border-b-2 border-neutral">
      <div class="container mx-auto py-4 px-4 sm:px-2 lg:px-3 xl:px-0">
        <div class="flex flex-col">
          <div class="flex items-center">
              <img ngSrc="assets/header-banner.svg" alt="DevFest" [style.position]="'relative'" fill >
          </div>
          <div class="flex justify-between items-center w-full">
            <nav class="flex gap-2">
              <a class="btn btn-sm" routerLink="/chat-recommender">Chat Recommender</a>
              <a class="btn btn-sm" routerLink="/classic-recommender">Classic Recommender</a>
            </nav>
            <div class="flex-1 flex justify-end">
              <a class="btn btn-sm btn-outline" routerLink="/">Back to search results</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {}
