import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { RecommendationChatStore } from '../common/recoomendation-chat.store';
import { ChatMessageRoleEnum, TChatMessage } from '../../shared/product.model';

@Component({
  selector: 'ai-reco-chat',
  standalone: true,
  imports: [NgClass],
  template: `
    <div class="w-full max-w-3xl mx-auto p-4">
      <div class="flex justify-between items-center mb-3">
        <h2 class="text-xl font-semibold">Chat</h2>
        <button class="btn btn-sm" (click)="clear()">Clear</button>
      </div>

      <div class="space-y-4 mb-4">
        @for (msg of history(); track $index) {
          <div class="chat" [ngClass]="{ 'chat-end': msg.role === 'user', 'chat-start': msg.role !== 'user' }">
            <div class="chat-image avatar">
              <div class="w-10 rounded-full">
                <img alt="avatar" [src]="msg.role === 'user' ? userAvatar : botAvatar" />
              </div>
            </div>
            <div class="chat-header">
              {{ msg.role === 'user' ? 'You' : 'Assistant' }}
            </div>
            <div class="chat-bubble" [ngClass]="{
              'chat-bubble-primary': msg.role === 'user',
              'chat-bubble-secondary': msg.role !== 'user'
            }">{{ msg.content }}</div>
          </div>
        }
        @if (chatState() === 'loading') {
          <div class="chat">
            <div class="chat-bubble chat-bubble-secondary">
              Typing...
            </div>
          </div>
        }
      </div>

      <form class="join w-full" (submit)="onSubmit($event)">
        <input
          type="text"
          class="input input-bordered join-item w-full"
          name="query"
          placeholder="Ask for product recommendations..."
          [value]="query()"
          (input)="onInput($any($event.target).value)"
        />
        <button class="btn btn-primary join-item" [disabled]="chatState() === 'loading' || !query().trim()">Send</button>
      </form>
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatComponent {
  readonly store = inject(RecommendationChatStore);

  readonly userAvatar = 'https://api.dicebear.com/9.x/fun-emoji/svg?seed=user';
  readonly botAvatar = 'https://api.dicebear.com/9.x/bottts/svg?seed=assistant';

  readonly history = this.store.history;
  readonly chatState = this.store.chatState;
  readonly query = signal('');

  onSubmit(event: Event) {
    event.preventDefault();
    const q = this.query().trim();
    if (!q) return;
    this.store.sendChatRequest({ query: q });
    this.query.set('');
  }

  clear() {
    this.store.clearChat();
    this.query.set('');
  }

  onInput(value: string) {
    this.query.set(value);
  }
}
