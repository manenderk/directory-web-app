import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';
import { SubSink } from 'subsink';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginFormGroup: FormGroup;
  passwordValidationErrors = {
    isValid: true,
    isMatches: true,
    length: false,
    upperCaseLetter: false,
    lowerCaseLetter: false,
    number: false,
    specialCharacter: false
  };
  registerFormGroup: FormGroup;
  showRegisterForm = false;

  private subsink = new SubSink();
  private window = window;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.initializeLoginForm();
    this.initializeRegisterForm();
  }

  ngOnDestroy() {
    this.subsink.unsubscribe();
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

    this.subsink.sink = this.registerFormGroup.valueChanges.subscribe(values => {
      if (values.password) {
        this.passwordValidationErrors.isValid = this.validatePassword(values.password);
      }

      if (values.passwordConfirm) {
        if (values.password !== values.passwordConfirm) {
          this.passwordValidationErrors.isMatches = false;
        } else {
          this.passwordValidationErrors.isMatches = true;
        }
      }
    });
  }

  validatePassword(password: string) {
    if (!password) {
      return;
    }
    let isValid = true;
    if (password.length < 8) {
      this.passwordValidationErrors.length = true;
      isValid = false;
    } else {
      this.passwordValidationErrors.length = false;
    }

    if (!password.match(/[A-Z]/)) {
      this.passwordValidationErrors.upperCaseLetter = true;
      isValid = false;
    } else {
      this.passwordValidationErrors.upperCaseLetter = false;
    }

    if (!password.match(/[a-z]/)) {
      this.passwordValidationErrors.lowerCaseLetter = true;
      isValid = false;
    } else {
      this.passwordValidationErrors.lowerCaseLetter = false;
    }

    if (!password.match(/\d/)) {
      this.passwordValidationErrors.number = true;
      isValid = false;
    } else {
      this.passwordValidationErrors.number = false;
    }

    if (!password.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/)) {
      this.passwordValidationErrors.specialCharacter = true;
      isValid = false;
    } else {
      this.passwordValidationErrors.specialCharacter = false;
    }

    return isValid;

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
    this.window.open(environment.apiHost + 'auth/login-google', '_top');
  }

  async doRegister() {
    console.log(this.registerFormGroup.valid, this.passwordValidationErrors.isValid, this.passwordValidationErrors.isMatches);
    if (this.registerFormGroup.valid && this.passwordValidationErrors.isValid && this.passwordValidationErrors.isMatches) {
      try {
        await this.authService.doRegister(
          this.registerFormGroup.value.firstName,
          this.registerFormGroup.value.lastName,
          this.registerFormGroup.value.email,
          this.registerFormGroup.value.password
        );
        Swal.fire('Done', 'You are registered', 'success');
      } catch (e) {
        if (e.error.message.includes('DuplicateRecordError')) {
          Swal.fire('Error', 'User with this email already exists', 'error');
        } else {
          Swal.fire('Error', 'System error, please contact support', 'error');
        }
      }

    }
  }

}
