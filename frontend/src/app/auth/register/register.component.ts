import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [FormsModule, RouterLink],
  standalone: true,
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}

  register() {
    if (!this.username || !this.email || !this.password) {
      alert('Please input correct values');
      return;
    }
    this.auth
      .register({
        username: this.username,
        email: this.email,
        password: this.password,
      })
      .subscribe({
        next: () => this.router.navigate(['/login']),
        error: () => alert('Registration failed'),
      });
  }
}
