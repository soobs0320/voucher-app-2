import { Component, OnInit } from '@angular/core';
import { SwsEmptyConfig } from 'src/app/components/empty/empty.component';
import { ErpService } from 'src/app/services/erp.service';
import { Content } from 'src/interfaces/erp';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-content-page',
  templateUrl: './content-page.page.html',
  styleUrls: ['./content-page.page.scss'],
})
export class ContentPage implements OnInit {
  content: Content;
  isError: boolean;
  emptyConfig: SwsEmptyConfig = {
    image: './assets/icon/error.svg',
    title: '_PAGE_MIGHT_BE_REMOVED_OR_BROKEN',
    message: '_PLEASE_TRY_AGAIN_LATER',
    retryButtonText: '_TRY_AGAIN',
  };

  constructor(
    private erpService: ErpService,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    try {
      const language = await this.storageService.get('language');
      const response = await this.erpService.getList<Content>('content', {
        code: 'help',
        code_type: '=',
        lang: language || 'en',
      });
      this.content = response.result[0];
    } catch (err) {
      console.error(err);
      this.isError = err;
    }
  }
}
