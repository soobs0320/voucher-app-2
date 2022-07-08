import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContentPageRoutingModule } from './content-page-routing.module';

import { ContentPage } from './content-page.page';
import { EmptyComponentModule } from '../components/empty/empty.module';
import { TranslateModule } from '@ngx-translate/core';
import { DynamicHTMLModule } from '../components/dynamic-html';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContentPageRoutingModule,
    TranslateModule,
    EmptyComponentModule,
    DynamicHTMLModule.forRoot({
      components: []
    }),
  ],
  declarations: [ContentPage],
})
export class ContentPageModule {}
