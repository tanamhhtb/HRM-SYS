import { Component, computed, inject } from '@angular/core';
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

  displayName = computed(() =>
    this.currentUser()?.employee?.fullName ?? this.currentUser()?.username ?? ''
  );

  initials = computed(() => {
    const name = this.displayName();
    if (!name) return '';
    const parts = name.trim().split(' ');
    const first = parts[0]?.[0] ?? '';
    const last = parts[parts.length - 1]?.[0] ?? '';
    return (first + last).toUpperCase();
  });
  
  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}