import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-stage-social-redirect',
  templateUrl: './stage-social-redirect.component.html',
  styleUrls: ['./stage-social-redirect.component.css']
})
export class StageSocialRedirectComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {

    let loginData = this.route.snapshot.queryParams.auth;
    if (!loginData) {
      Swal.fire('Error', 'Something went wrong, please contact support', 'error');
      this.router.navigate(['/']);
    }
    loginData = decodeURIComponent(loginData);
    console.log(loginData);
    this.authService.saveAuthDataFromSocialLogin(loginData);
    this.router.navigate(['/']);
  }

}
