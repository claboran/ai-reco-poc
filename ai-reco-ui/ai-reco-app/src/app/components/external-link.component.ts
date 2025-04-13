import { ChangeDetectionStrategy, Component, HostBinding, input } from '@angular/core';

@Component({
  selector: 'aireco-external-link',
  imports: [],
  template: `
    <div class="flex flex-row items-center">
      <img src="assets/link.svg" alt="link" class="w-4 h-auto mr-2"/>
      <div>
        {{ linkText() }}
      </div>
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExternalLinkComponent {
  @HostBinding('class')
  readonly classes = ['w-full'];
  linkText = input.required<string>();
}
