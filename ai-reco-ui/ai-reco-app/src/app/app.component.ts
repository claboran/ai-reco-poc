import { ChangeDetectionStrategy, Component } from '@angular/core';
import HomeLayoutComponent from "./pages/home.page";

@Component({
  selector: 'aireco-root',
  imports: [HomeLayoutComponent],
  standalone: true,
  template: `
    <aireco-home-layout />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
