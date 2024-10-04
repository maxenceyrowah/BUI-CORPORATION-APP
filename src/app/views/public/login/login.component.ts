import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgIf } from '@angular/common';

import { FormFieldComponent } from '@shared/components/form-field-component';
import { AuthGateway } from '@core/ports';
import { ACCESS_TOKEN_KEY, CONNECTED_USER_KEY } from '@shared/constants/auth';
import { ErrorsService } from '@shared/services/errors.service';
import { ToasterService } from '@shared/services/toaster.server';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormFieldComponent,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    NgIf,
  ],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  private readonly authService = inject(AuthGateway);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly _snackBar = inject(ToasterService);
  private readonly errorService = inject(ErrorsService);

  loginForm: FormGroup;
  firstIndex = 0;
  hide = signal(true);
  isSubmitting = signal(false);

  ngOnInit() {
    this.initLoginForm();
  }

  async submit() {
    const dataForm = this.loginForm.value;

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    try {
      const payload = {
        email: dataForm.email as string,
        password: dataForm.password as string,
      };
      const data = await this.authService.login(payload);

      if (data) {
        const { user } = data;
        this.isSubmitting.set(false);
        this.setItemToLocalStorage(
          user?.accessToken,
          user?.providerData?.[this.firstIndex]
        );
        this._snackBar.show('Connexion réussie avec succès.');
        this.router.navigate(['/app/gestions-taches']);
      }
    } catch (error) {
      this.errorService.handleError(error);
      this.isSubmitting.set(false);
    }
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  private setItemToLocalStorage(token: any, user: any) {
    localStorage.setItem(CONNECTED_USER_KEY, JSON.stringify(user));
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  }
  private initLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
}
