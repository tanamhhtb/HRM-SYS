import { Component, inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ReactiveFormsModule, Validators } from "@angular/forms";
import { TranslatePipe, TranslateService } from "@ngx-translate/core";
import { AuthService } from "../../../../core/services/auth.service";
import { SearchBarComponent } from "../../../../shared/components/search-bar/search-bar.component";
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,TranslatePipe, SearchBarComponent],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private translate = inject(TranslateService);

fields: FormfieldConfig[] = [
  {
    name: 'username',
    type: 'text',
    label: 'LOGIN.USERNAME_LABEL',
    placeholder: 'LOGIN.USERNAME_PLACEHOLDER',
    validators: [Validators.required],
    errorMessage: {
      required:'LOGIN.VALIDATION.USERNAME_REQUIRED' 
    }
  },
  {
    name: 'password',
    type: 'password',
    label: 'LOGIN.PASSWORD_LABEL',
    placeholder: 'LOGIN.PASSWORD_PLACEHOLDER',
    validators: [Validators.required, Validators.minLength(6)],
    errorMessage: {
      required: 'LOGIN.VALIDATION.PASSWORD_REQUIRED',
      minLenght: 'LOGIN.VALIDATION.PASSWORD_MIN'
    }
  }
];
  isLoading = false;
  errorMsg = '';

  onLogin(data: Record<string, any>) {
    this.errorMsg = '';
    this.isLoading = true;
    this.authService.login({
      username: data['username'].trim(),
      password: data['password'], 
    }).subscribe({
      next: () => {
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] ?? '/dashboard';
        this.router.navigateByUrl(returnUrl);
      },
      error: (err) => {
        this.isLoading = false;
        if (err.status === 401) {
          this.errorMsg = this.translate.instant('LOGIN.ERROR.INVALID_CREDENTIALS');
        }
      },
    });
  }
}