import { Component, OnInit } from '@angular/core';
import { Language } from 'src/interfaces/erp';
import { ErpService } from '../services/erp.service';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.page.html',
  styleUrls: ['./personal-info.page.scss'],
})
export class PersonalInfoPage implements OnInit {
  user = { language: 'zh', theme: 'LIGHT' };
  languages: Language[];

  constructor(private erpService: ErpService) {}

  ngOnInit() {
    this.initialize();
  }

  async initialize() {
    const response = await this.erpService.getList<Language>('language');
    this.languages = response.result;
  }

  onLangChange() {
    console.log('language changed', this.user.language);
  }

  onThemeChange() {
    console.log('theme changed', this.user.theme);
  }

  logout() {
    this.erpService.logout();
  }
}
