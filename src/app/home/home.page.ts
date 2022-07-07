import { Component, OnInit } from '@angular/core';

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

  constructor() {}

  ngOnInit() {}
}

interface Menu {
  icon: string;
  name: string;
  url: string;
}
