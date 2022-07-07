import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private translateService: TranslateService,
    private storageService: StorageService,
    private platform: Platform
  ) {}

  ngOnInit() {
    this.platform.ready().then(async () => {
      this.translateService.use('en');
      await this.storageService.init();
    });
  }
}
