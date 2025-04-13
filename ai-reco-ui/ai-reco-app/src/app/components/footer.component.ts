import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExternalLinkComponent } from "./external-link.component";

@Component({
  selector: 'aireco-footer',
  imports: [
    CommonModule,
    ExternalLinkComponent,
  ],
  template: `
    <footer class="footer bg-neutral text-neutral-content justify-items-end">
      <div class="p-5 xl:p-10">
        <span class="footer-title">Links and Attributions</span>
        <a href="https://ollama.com/" class="link link-hover">
          <aireco-external-link linkText="ollama.com" ></aireco-external-link>
        </a>
        <a href="https://spring.io/projects/spring-ai" class="link link-hover">
          <aireco-external-link linkText="Spring AI"></aireco-external-link>
        </a>
        <a href="https://www.trychroma.com/" class="link link-hover">
          <aireco-external-link linkText="Chroma AI application database"></aireco-external-link>
        </a>
      </div>
    </footer>
  `,
  styles: ``,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {}
