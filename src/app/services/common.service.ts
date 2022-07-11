import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(
    private alertController: AlertController,
    private loadingCtrl: LoadingController,
    private translateService: TranslateService,
    private storageService: StorageService,
    private router: Router
  ) {}

  async presentAlert(title: string, message: string) {
    const alert = await this.alertController.create({
      header: title,
      message,
      buttons: ['ok'],
    });

    await alert.present();
  }

  async showLoading(message: string) {
    const loading = await this.loadingCtrl.create({
      message,
    });

    loading.present();
  }

  async hideLoading() {
    await this.loadingCtrl.dismiss();
  }

  changeLanguage(language: string) {
    this.translateService.use(language);
    this.storageService.set('language', language);
  }

  logout() {
    this.storageService.remove('token');
    this.storageService.remove('refreshToken');
    this.storageService.remove('user');
    this.router.navigate(['/login']);
  }
}
