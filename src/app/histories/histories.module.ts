import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistoriesPageRoutingModule } from './histories-routing.module';

import { HistoriesPage } from './histories.page';
import { TranslateModule } from '@ngx-translate/core';
import { EmptyComponentModule } from '../components/empty/empty.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistoriesPageRoutingModule,
    TranslateModule,
    EmptyComponentModule
  ],
  declarations: [HistoriesPage]
})
export class HistoriesPageModule {}
