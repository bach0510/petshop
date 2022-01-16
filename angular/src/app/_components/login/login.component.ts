import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { Employee } from 'src/app/_models/employee';
import { TaiKhoanInput } from 'src/app/_models/tai-khoan-input';
import { AlertService } from '../../_services/alert.service';
import { AuthenticationService } from '../../_services/authentication.service';
declare let alertify: any;
@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss'],
})
export class LoginComponent implements OnInit {
  loading = false;
  submitted = false;
  returnUrl: string;
  userName;
  password;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit() {
    if (!this.userName){
      alertify.error("tên đăng nhập không được để trống");
      return;
    }
    if (!this.userName){
      alertify.error("mật khẩu không được để trống");
      return;
    }
    this.submitted = true;

    this.loading = true;

    var user = new TaiKhoanInput();
    user.TenTk = this.userName;
    user.MatKhau = this.password;

    this.authenticationService
      .login(user)
      .pipe(first())
      .subscribe(
        (data) => {
          if (data === null) return alertify.error('Tài khoản hoặc mật khẩu không chính xác');
          this.router.navigate(['sanPham']);
          //window.location.reload();
          this.alertService.success('Success');
          alertify.success('Đăng nhập thành công');
        },
        (error) => {
          this.alertService.error(error);
          this.loading = false;
        }
      );
  }

}
