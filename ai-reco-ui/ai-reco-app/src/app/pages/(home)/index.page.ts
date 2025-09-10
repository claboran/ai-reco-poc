
 import { ChangeDetectionStrategy, Component } from '@angular/core';
 import { RouterLink } from "@angular/router";

 @Component({
   standalone: true,
   imports: [
     RouterLink
   ],
   template: `
     <div class="px-4 md:px-3 lg:px-2 xl:px-0 mt-6 animate__animated animate__fadeIn">
       <div class="card bg-base-100 shadow-xl border border-base-200">
         <div class="card-body">
           <h2 class="card-title">Welcome to AI Product Recommender</h2>
           <p>
             Choose how you want to explore recommendations:
           </p>
           <ul class="list-disc ml-5 space-y-2">
             <li>
               <span class="font-semibold">Classic Recommender</span> — search via text, powered by embeddings only.
             </li>
             <li>
               <span class="font-semibold">Chat Recommender</span> — conversational experience using chat with embeddings context.
             </li>
             <li>
               <span class="font-semibold">Embeddings Only</span> — direct embedding-based results without chat interaction.
             </li>
           </ul>
           <div class="card-actions justify-end mt-4 gap-2">
             <a class="btn btn-primary" routerLink="/classic-recommender">Classic</a>
             <a class="btn btn-secondary" routerLink="/chat-recommender">Chat</a>
           </div>
         </div>
       </div>
     </div>
   `,
   styles: [],
   changeDetection: ChangeDetectionStrategy.OnPush,
 })
 export default class HomePage {}
