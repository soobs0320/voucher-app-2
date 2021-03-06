import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';
import { ErpService } from '../services/erp.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  isLoading = false;
  loginForm: FormGroup;
  supportedLangs = [];

  constructor(
    private fb: FormBuilder,
    private erpService: ErpService,
    private storageService: StorageService,
    private router: Router,
    private commonService: CommonService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.required],
    });
  }

  async onLogin() {
    try {
      const response = await this.erpService.login(this.loginForm.value);
      const token = response.headers
        .get('x-auth-token')
        .split('Authorization=')
        .pop()
        .split(';')[0];
      const refreshToken = response.headers.get('x-auth-refresh-token');
      await this.storageService.set('token', token);
      await this.storageService.set('refreshToken', refreshToken);
      await this.storageService.set('user', response.body.data);
      this.router.navigate(['/home']);
    } catch (error) {
      this.commonService.presentAlert('Error','Login Failed');
    }
  }
}
