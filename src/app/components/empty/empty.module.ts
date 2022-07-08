import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { EmptyComponent } from './empty.component';

@NgModule({
  imports: [CommonModule, TranslateModule, IonicModule],
  exports: [EmptyComponent],
  declarations: [EmptyComponent],
})
export class EmptyComponentModule {}
