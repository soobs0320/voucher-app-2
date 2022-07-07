import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { EmptyComponent } from './empty.component';

@NgModule({
  imports: [CommonModule, TranslateModule],
  exports: [EmptyComponent],
  declarations: [EmptyComponent],
})
export class EmptyComponentModule {}
