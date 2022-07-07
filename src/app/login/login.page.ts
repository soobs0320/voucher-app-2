import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(
    private fb: FormBuilder,
    private erpService: ErpService,
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.required],
    });
  }

  async onLogin() {
    const response = await this.erpService.login(this.loginForm.value);
    const token = response.headers
      .get('x-auth-token')
      .split('Authorization=')
      .pop()
      .split(';')[0];
    const refreshToken = response.headers.get('x-auth-refresh-token');
    this.storageService.set('token', token);
    this.storageService.set('refreshToken', refreshToken);
    this.storageService.set('userId', response.body.data.doc_id);
    this.router.navigate(['/home']);
  }
}
