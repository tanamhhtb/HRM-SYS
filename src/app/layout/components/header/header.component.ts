import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  currentUser = this.authService.currentUser;
  menuOpen = signal(false);

  displayName = computed(() =>
    this.currentUser()?.employee?.fullName ?? this.currentUser()?.username ?? ''
  );

  roleName = computed(() => this.currentUser()?.role?.code ?? '');

  initials = computed(() => {
    const name = this.displayName();
    if (!name) return '';
    const parts = name.trim().split(' ');
    const first = parts[0]?.[0] ?? '';
    const last = parts[parts.length - 1]?.[0] ?? '';
    return (first + last).toUpperCase();
  });

  toggleMenu() {
    this.menuOpen.update(v => !v);
  }

  goToProfile() {
    this.menuOpen.set(false);
    this.router.navigateByUrl('/profile');
  }

  onLogout() {
    this.menuOpen.set(false);
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}