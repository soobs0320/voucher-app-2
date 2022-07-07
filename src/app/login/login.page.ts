import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(private fb: FormBuilder, private erpService: ErpService,private storageService:StorageService) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.required],
    });
  }

  async onLogin() {
    const response= await this.erpService.login(this.loginForm.value);
    console.log(response);
    
  }
}
