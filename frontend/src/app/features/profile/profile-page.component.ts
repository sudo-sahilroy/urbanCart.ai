import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../core/services/user.service';
import { User } from '../../core/models/user.model';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="bg-gradient-to-br from-amber-50 via-white to-orange-50 min-h-screen" *ngIf="user">
      <div class="max-w-5xl mx-auto py-14 px-6 space-y-6">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p class="text-xs uppercase tracking-[0.3em] text-slate-500">Account</p>
            <h2 class="text-4xl font-black leading-tight">Profile</h2>
            <p class="text-slate-700">Manage your details, shipping address, and contact info.</p>
          </div>
          <div class="px-4 py-2 bg-white/80 backdrop-blur rounded-full text-sm shadow border border-slate-100">
            Last updated just now
          </div>
        </div>

        <div class="grid md:grid-cols-3 gap-6">
          <div class="md:col-span-2 bg-white/80 backdrop-blur rounded-3xl shadow-lg border border-orange-100 p-8 space-y-4">
            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <label class="text-sm text-slate-600 mb-1 block">Full name</label>
                <input [(ngModel)]="user.fullName" name="fullName" class="w-full border rounded-xl p-3 focus:outline-none focus:border-black" placeholder="Full name">
              </div>
              <div>
                <label class="text-sm text-slate-600 mb-1 block">Email</label>
                <input [value]="user.email" disabled class="w-full border rounded-xl p-3 bg-slate-50 text-slate-500">
              </div>
              <div>
                <label class="text-sm text-slate-600 mb-1 block">Phone</label>
                <input [(ngModel)]="user.phone" name="phone" class="w-full border rounded-xl p-3 focus:outline-none focus:border-black" placeholder="Phone">
              </div>
              <div>
                <label class="text-sm text-slate-600 mb-1 block">Avatar URL</label>
                <input [(ngModel)]="user.avatarUrl" name="avatarUrl" class="w-full border rounded-xl p-3 focus:outline-none focus:border-black" placeholder="https://...">
              </div>
            </div>
            <div>
              <label class="text-sm text-slate-600 mb-1 block">Address</label>
              <textarea [(ngModel)]="user.address" name="address" class="w-full border rounded-2xl p-3 focus:outline-none focus:border-black" rows="3" placeholder="Street, City, State, Pincode"></textarea>
            </div>
            <div class="flex gap-3">
              <button class="btn-primary rounded-full px-6" type="button" (click)="save()">Save changes</button>
              <button class="px-5 py-3 rounded-full border border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white transition" type="button" (click)="reset()">Reset</button>
            </div>
            <p class="text-sm text-emerald-600" *ngIf="saved">Saved!</p>
          </div>

          <div class="space-y-4">
            <div class="bg-white rounded-3xl shadow-lg border border-slate-100 p-6">
              <p class="text-xs uppercase tracking-[0.3em] text-slate-500">Perks</p>
              <ul class="mt-3 space-y-2 text-sm text-slate-700">
                <li>• Fast checkout with saved address</li>
                <li>• Track orders and returns</li>
                <li>• Sync AI recommendations</li>
              </ul>
            </div>
            <div class="bg-gradient-to-br from-slate-900 to-black text-white rounded-3xl p-6 shadow-lg">
              <p class="text-xs uppercase tracking-[0.3em] text-white/70">Need help?</p>
              <p class="text-lg font-semibold mt-2">Chat with support</p>
              <p class="text-sm text-white/80 mt-1">We usually respond in under 5 minutes.</p>
              <button class="mt-4 bg-white text-slate-900 px-4 py-2 rounded-full font-semibold">Open chat</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ProfilePageComponent implements OnInit {
  user?: User;
  saved = false;
  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.userService.me().subscribe(u => this.user = u);
  }
  save() {
    if (!this.user) return;
    this.userService.update(this.user).subscribe(u => {
      this.user = u;
      this.saved = true;
      setTimeout(() => this.saved = false, 2000);
    });
  }

  reset() {
    this.userService.me().subscribe(u => this.user = u);
  }
}
