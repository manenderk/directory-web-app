import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginFormGroup: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initializeLoginForm();
  }

  initializeLoginForm() {
    this.loginFormGroup = new FormGroup({
      email: new FormControl(null, {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl(null, Validators.required)
    });
  }

  async doLogin() {
    if (this.loginFormGroup.valid) {
      const result = await this.authService.doLoginByEmailPassword(this.loginFormGroup.value.email, this.loginFormGroup.value.password);
      if (result === 'success') {
        this.router.navigate(['/']);
      } else {
        Swal.fire('Error', result, 'error');
      }
    }
  }

}
