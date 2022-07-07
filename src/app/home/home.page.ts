import { Component, OnInit } from '@angular/core';
import { ErpService } from '../services/erp.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  menus: Menu[] = [
    { name: '_SCAN_QR_CODE', icon: 'qr-code-outline', url: '/scanner' },
    { name: '_HISTORY', icon: 'list-outline', url: '/histories' },
    { name: '_HELP', icon: 'help-circle-outline', url: '/content-page' },
    { name: '_PERSONAL_INFO', icon: 'person-outline', url: '/personal-info' },
  ];

  constructor(private erp: ErpService) {}

  ngOnInit() {}

  async call() {
    const res = await this.erp.getList<any>('campaign');
  }
}

interface Menu {
  icon: string;
  name: string;
  url: string;
}
