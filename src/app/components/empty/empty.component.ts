import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export interface SwsEmptyConfig {
  image?: string,
  title: string,
  message: string,
  retryButtonText?: string
}

@Component({
  selector: 'app-empty',
  templateUrl: './empty.component.html',
  styleUrls: ['./empty.component.scss'],
})
export class EmptyComponent implements OnInit {
  @Input() config: SwsEmptyConfig;
  @Output() retry: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
    if (this.config == null || undefined) {
      this.config = {
        image: "./assets/icon/empty.svg",
        title: "Nothing Here",
        message: "Explore other things"
      }
    }
  }

  onClick() {
    return this.retry.emit(true);
  }

}
