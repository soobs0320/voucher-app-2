import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Language } from 'src/interfaces/erp';
import { CommonService } from '../services/common.service';
import { ErpService } from '../services/erp.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.page.html',
  styleUrls: ['./personal-info.page.scss'],
})
export class PersonalInfoPage implements OnInit {
  languages: Language[];
  selectedLanguage;
  name;

  constructor(
    private erpService: ErpService,
    private storageService: StorageService,
    private commonService: CommonService
  ) {}

  ngOnInit() {
    this.initialize();
  }

  async initialize() {
    const user = await this.storageService.get('user');
    this.name = user.first_name + ' ' + user.last_name;

    const response = await this.erpService.getList<Language>('language');
    this.languages = response.result;

    const language = await this.storageService.get('language');
    this.selectedLanguage = language || 'en';
  }

  onLangChange() {
    this.commonService.changeLanguage(this.selectedLanguage);
  }

  logout() {
    this.commonService.logout();
  }
}
