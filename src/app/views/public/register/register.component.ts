import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';

import { FormFieldComponent } from '@shared/components/form-field-component';
import { NgIf } from '@angular/common';
import { AuthGateway } from '@core/ports';
import { CONNECTED_USER_KEY } from '@shared/constants/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormFieldComponent,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    NgIf,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  private readonly authService = inject(AuthGateway);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly _snackBar = inject(MatSnackBar);

  registerForm: FormGroup;
  firstIndex = 0;
  isSubmitting = signal(true);
  hide = signal(true);

  ngOnInit() {
    this.initRegisterForm();
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  async submit() {
    const dataForm = this.registerForm.value;

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    try {
      const payload = {
        email: dataForm.email as string,
        password: dataForm.password as string,
      };
      const data = await this.authService.register(payload);

      if (data) {
        const { user } = data;
        this.isSubmitting.set(false);
        this.setItemToLocalStorage(user?.providerData?.[this.firstIndex]);
        this._snackBar.open(
          'Votre compte a été créé avec succès. Vous pouvez maintenant vous connecter.'
        );
        this.router.navigate(['/public/login']);
      }
    } catch (error) {
      console.log('🚀 ~ RegisterComponent ~ submit ~ error:', error);
      this.isSubmitting.set(false);
    }
  }

  private setItemToLocalStorage(user: any) {
    localStorage.setItem(CONNECTED_USER_KEY, JSON.stringify(user));
  }

  private initRegisterForm() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
}
