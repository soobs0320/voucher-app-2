import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ScannerPage } from './scanner.page';

import { ScannerPageRoutingModule } from './scanner-routing.module';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScannerPageRoutingModule,
    TranslateModule
  ],
  declarations: [ScannerPage]
})
export class ScannerPageModule {}
