import { Component, OnInit } from '@angular/core';
import {
  BarcodeScanner,
  ScanResult,
} from '@capacitor-community/barcode-scanner';

import { ErpService } from '../services/erp.service';
import { Location } from '@angular/common';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-scanner',
  templateUrl: 'scanner.page.html',
  styleUrls: ['scanner.page.scss'],
})
export class ScannerPage implements OnInit {
  isScanning: boolean = false;
  isLoading: boolean = false;
  pattern = /\/activation-history\/(\d+)/;

  constructor(
    private commonService: CommonService,
    private erpService: ErpService,
    private _location: Location
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.startScan();
    }, 1000);
  }

  async startScan() {
    const permissionOk = await this.requestPermission();

    if (!permissionOk) return;

    // await BarcodeScanner.hideBackground(); // make background of WebView transparent
    this.isScanning = true;
    document.body.classList.add('background-transparent');

    const result = await BarcodeScanner.startScan(); // start scanning and wait for a result
    console.log('scan result', result);

    this.processResult(result);
  }

  async processResult(result: ScanResult) {
    try {
      this.isLoading = true;
      if (!result.hasContent) return;

      if (!this.pattern.test(result.content)) {
        this.commonService.presentAlert('Error', 'Invalid QR code');
        return;
      }

      const [_, voucherActivationId] = this.pattern.exec(result.content);

      await this.erpService.update(
        'voucher activation history',
        +voucherActivationId,
        null
      );
      this.commonService.presentAlert(
        'Success',
        'Voucher successfully scanned'
      );
    } catch (error) {
      console.log(error);
      this.commonService.presentAlert(
        'Error',
        error.error.error || 'Something goes wrong'
      );
    } finally {
      this.isLoading = false;
      this.isScanning = false;
      document.body.classList.remove('background-transparent');
      this._location.back();
    }
  }

  stopScan() {
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
    this.isScanning = false;
    document.body.classList.remove('background-transparent');
    this._location.back();
  }

  private async requestPermission() {
    const status = await BarcodeScanner.checkPermission({ force: true });
    console.log('permission status', status);

    if (status.granted) {
      return true;
    }

    this.commonService.presentAlert(
      'Alert',
      'Camera permission must be enabled to scan qr code'
    );
    return false;
  }
}
