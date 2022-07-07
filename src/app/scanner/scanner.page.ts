import { Component } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

@Component({
  selector: 'app-scanner',
  templateUrl: 'scanner.page.html',
  styleUrls: ['scanner.page.scss'],
})
export class ScannerPage {
  constructor() {}

  async startScan() {
    BarcodeScanner.hideBackground(); // make background of WebView transparent

    const result = await BarcodeScanner.startScan(); // start scanning and wait for a result
    console.log('scan result', result);
    // if the result has content
    if (result.hasContent) {
      console.log(result.content); // log the raw scanned content

      if (!/\/activation-history\/(\d+)/.test(result.content))
        return console.log('invalid qr code');

      const [_, activationHistoryId] = /\/activation-history\/(\d+)/.exec(
        result.content
      );

      console.log('id', activationHistoryId);
    }
  }

  stopScan() {
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
  }

  async checkPermission() {
    // check or request permission
    const status = await BarcodeScanner.checkPermission({ force: true });

    if (status.granted) {
      // the user granted permission
      return true;
    }

    return false;
  }
}
