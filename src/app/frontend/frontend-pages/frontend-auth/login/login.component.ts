import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginFormGroup: FormGroup;
  registerFormGroup: FormGroup;
  showRegisterForm = false;
  window: Window;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.initializeLoginForm();
    this.initializeRegisterForm();
  }

  initializeLoginForm() {
    this.loginFormGroup = new FormGroup({
      email: new FormControl(null, {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl(null, Validators.required)
    });
  }

  initializeRegisterForm() {
    this.registerFormGroup = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      email: new FormControl(null, {
        validators: [Validators.email, Validators.required]
      }),
      password: new FormControl(null, Validators.required),
      passwordConfirm: new FormControl(null, Validators.required)
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

  async doLoginByGoogle() {
    window.open(environment.apiHost + 'auth/login-google', '_top');
  }

  async doRegister() {
    if (this.registerFormGroup.valid) {

    }
  }

}
