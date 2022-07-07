import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, IonItemSliding } from '@ionic/angular';
import * as moment from 'moment';
import { SwsEmptyConfig } from '../components/empty/empty.component';
import { Notification } from '../../interfaces/erp';

@Component({
  selector: 'app-histories',
  templateUrl: './histories.page.html',
  styleUrls: ['./histories.page.scss'],
})
export class HistoriesPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonItemSliding) itemSliding: IonItemSliding;

  public isError: any;
  public notificationFilter;
  public notifications: Notification[];
  public notificationTotal: number;
  public selectedIds: number[] = [];
  public canSelect: boolean = false;
  public notificationGroups: NotificationGroup[] = [
    { groupName: 'NEW', notifications: [] },
    { groupName: 'EARLIER', notifications: [] },
  ];
  public emptyConfig: SwsEmptyConfig = {
    image: './assets/icon/empty.svg',
    title: '_YOU_DO_NOT_HAVE_ANY_INBOX',
    message: '_GET_MORE_VOUCHERS',
  };
  public isSelectAll: boolean = false;

  constructor() {}

  async ngOnInit() {
    this.initFilter();
    this.loadNotifications();
  }

  initFilter() {
    this.notificationFilter = {
      pagination: {
        itemsPerPage: 10,
        currentPage: 1,
      },
      sort: {
        sortBy: 'sentTime',
        sortType: 'desc',
      },
    };
  }

  async loadNotifications(infiniteScroll: IonInfiniteScroll = null) {
    try {
      // let res = await this.customerService.getNotifications(this.notificationFilter);
      // this.notificationTotal = res.total;
      // res.result = res.result.map((notification) => {
      //   let sentTime = moment(notification.sentTime);
      //   let earlierTime = moment().subtract(1, 'weeks');
      //   notification.timeGroup = sentTime.isBefore(earlierTime) ? '_EARLIER' : '_NEW';
      //   notification.sentTime = sentTime.startOf("minutes").fromNow();

      //   /** TODO: Testing with infinite scroll */
      //   notification.selected = this.isSelectAll;

      //   return notification;
      // })

      // if (infiniteScroll)
      //   this.notifications = [...this.notifications, ...res.result];
      // else
      //   this.notifications = res.result;

      if (infiniteScroll) {
        const notifications = [
          {
            title: 'title 1 load more',
            message: 'message 1 a long message a long message a long message',
            sentTime: '2022-07-06',
          },
          {
            title: 'title 2 load more',
            message: 'message 2 a long message a long message a long message',
            sentTime: '2022-07-06',
          },
          {
            title: 'title 3 load more',
            message: 'message 3',
            sentTime: '2022-07-06',
          },
        ];
        this.notifications = [...this.notifications, ...notifications];
      } else {
        console.log('this is init');
        this.notifications = [
          {
            title: 'title 1',
            message: 'message 1 a long message a long message a long message',
            sentTime: '2022-07-06',
          },
          {
            title: 'title 2',
            message: 'message 2 a long message a long message a long message',
            sentTime: '2022-07-06',
          },
          {
            title: 'title 3',
            message: 'message 3',
            sentTime: '2022-07-06',
          },
          {
            title: 'title 4',
            message: 'message 1 a long message a long message a long message',
            sentTime: '2022-07-06',
          },
          {
            title: 'title 5',
            message: 'message 2 a long message a long message a long message',
            sentTime: '2022-07-06',
          },
          {
            title: 'title 6',
            message: 'message 3',
            sentTime: '2022-07-06',
          },
          {
            title: 'title 7',
            message: 'message 1 a long message a long message a long message',
            sentTime: '2022-07-06',
          },
          {
            title: 'title 8',
            message: 'message 2 a long message a long message a long message',
            sentTime: '2022-07-06',
          },
          {
            title: 'title 9',
            message: 'message 3',
            sentTime: '2022-07-06',
          },
          {
            title: 'title 10',
            message: 'message 1 a long message a long message a long message',
            sentTime: '2022-07-06',
          },
        ];
      }
    } catch (err) {
      console.error(err);
      return (this.isError = err);
    } finally {
      if (infiniteScroll) {
        infiniteScroll.complete();
        if (this.notifications.length >= this.notificationTotal)
        {
          infiniteScroll.disabled = true;
          console.log('disabled');
        }
      }
    }
  }

  loadMoreNotifications() {
    console.log('load more');
    this.notificationFilter.pagination.currentPage += 1;
    this.loadNotifications(this.infiniteScroll);
  }

  // async onNotification(notification: Notification) {
  //   if (!this.canSelect && notification.status == "UNREAD") {
  //     try {
  //       await this.customerService.readNotifications(notification.doc_id);
  //       let count = this.customerService.onNotificationCount.value;
  //       this.customerService.onNotificationCount.next(count - 1);
  //       notification.status = "READ";

  //     } catch (err) {
  //       console.error(err);
  //       await this.baseService.presentToast("_ERROR_WHILE_READING_NOTIFICATION");
  //     }
  //   }
  // }

  // async onDelete(id?: number) {
  //   if (!this.isSelectAll && this.selectedIds.length <= 0) {
  //     return await this.baseService.presentToast("_NO_NOTIFICATION_SELECTED");
  //   }

  //   let confirmText = id
  //     ? "_CONFIRM_TO_DELETE_SELECTED_NOTIFICATIONS"
  //     : this.isSelectAll
  //       ? "_CONFIRM_TO_DELETE_All_NOTIFICATIONS"
  //       : "_CONFIRM_TO_DELETE_SELECTED_NOTIFICATIONS";

  //   let confirm = await this.baseService.presentConfirm(confirmText);
  //   if (confirm) {
  //     await this.baseService.presentLoading();

  //     try {
  //       let successText: string;
  //       if (id) {
  //         successText = "_SELECTED_NOTIFICATION_DELETED";
  //         await this.customerService.deleteNotifications(id);

  //         this.notifications = this.notifications
  //           .filter((notification) => id != notification.doc_id);

  //       } else {
  //         if (this.isSelectAll) {
  //           successText = "_ALL_NOTIFICATION_DELETED";
  //           await this.customerService.deleteNotifications("all");

  //           this.initFilter();
  //           this.loadNotifications();

  //         } else {
  //           successText = "_SELECTED_NOTIFICATION_DELETED";
  //           await this.customerService.deleteNotifications(this.selectedIds);

  //           this.notifications = this.notifications
  //             .filter((notification) => !this.selectedIds.includes(notification.doc_id));
  //         }
  //       }

  //       this.onCloseSelect();
  //       await this.baseService.presentToast(successText);

  //     } catch (err) {
  //       console.error(err);
  //       let errorText = id
  //         ? "_FAILED_TO_SELECT_SELECTED_NOTIFICATION"
  //         : this.isSelectAll
  //           ? "_FAILED_TO_DELETE_ALL_NOTIFICATION"
  //           : "_FAILED_TO_SELECT_SELECTED_NOTIFICATION";
  //       await this.baseService.presentToast(errorText);

  //     } finally {
  //       await this.baseService.dismissLoading();
  //     }
  //   }
  // }

  // async onMarkAsRead() {
  //   if (!this.isSelectAll && this.selectedIds.length <= 0) {
  //     return await this.baseService.presentToast("_NO_NOTIFICATION_SELECTED");
  //   }

  //   let confirmText = this.isSelectAll
  //     ? "_CONFIRM_TO_MARK_ALL_NOTIFICATIONS_AS_READ"
  //     : "_CONFIRM_TO_MARK_SELECTED_NOTIFICATIONS_AS_READ";

  //   let confirm = await this.baseService.presentConfirm(confirmText);
  //   if (confirm) {
  //     await this.baseService.presentLoading();

  //     try {
  //       let successText: string;
  //       if (this.isSelectAll) {
  //         successText = "_ALL_NOTIFICATION_MARKED_AS_READ";
  //         await this.customerService.readNotifications("all");

  //         this.initFilter();
  //         this.loadNotifications();
  //         this.customerService.onNotificationCount.next(0);

  //       } else {
  //         successText = "_SELECTED_NOTIFICATION_MARKED_AS_READ";
  //         await this.customerService.readNotifications(this.selectedIds);

  //         this.notifications = this.notifications.map((notification) => {
  //           if (this.selectedIds.includes(notification.doc_id))
  //             notification.status = "READ";
  //           return notification;
  //         })

  //         let count = this.customerService.onNotificationCount.value;
  //         this.customerService.onNotificationCount.next(count - this.selectedIds.length);
  //       }

  //       this.onCloseSelect();
  //       await this.baseService.presentToast(successText);

  //     } catch (err) {
  //       console.error(err);
  //       let errorText = this.isSelectAll
  //         ? "_FAILED_TO_MARK_ALL_NOTIFICATION_AS_READ"
  //         : "_FAILED_TO_MARK_SELECTED_NOTIFICATION_AS_READ";
  //       await this.baseService.presentToast(errorText);

  //     } finally {
  //       await this.baseService.dismissLoading();
  //     }
  //   }
  // }

  // onSelectChange(checked: boolean, notification: Notification) {
  //   if (checked) {
  //     notification.selected = true;
  //     this.selectedIds.push(notification.doc_id);
  //   } else {
  //     notification.selected = false;
  //     let index = this.selectedIds.indexOf(notification.doc_id);
  //     this.selectedIds.splice(index, 1);
  //   }
  // }

  // async onCloseSelect() {
  //   this.selectedIds = [];
  //   this.canSelect = false;
  //   this.isSelectAll = false;

  //   if (this.itemSliding)
  //     await this.itemSliding.closeOpened();

  //   this.onSelectAllChange();
  // }

  async doRefresh(refresher: any = null) {
    if (this.infiniteScroll) this.infiniteScroll.disabled = false;
    if (refresher) refresher.target.complete();
    if (this.isError) this.isError = null;

    this.notifications = null;
    this.initFilter();
    this.loadNotifications();
  }

  // async onMore(itemSliding: IonItemSliding) {
  //   await itemSliding.open("end");
  // }

  // async toggleEdit() {
  //   if (this.notificationTotal <= 0) {
  //     return await this.baseService.presentToast("_EMPTY_NOTIFICATION");
  //   }

  //   this.isSelectAll = false;
  //   this.selectedIds = [];
  //   this.canSelect = !this.canSelect;

  //   if (this.canSelect) {
  //     await this.itemSliding.closeOpened();
  //   } else {
  //     this.notifications = this.notifications.map((notification) => {
  //       notification.selected = false;
  //       return notification;
  //     })
  //   }
  // }

  // onSelectAllChange() {
  //   if (this.notifications) {
  //     this.notifications = this.notifications.map((notification) => {
  //       notification.selected = this.isSelectAll;
  //       return notification;
  //     })
  //   }
  // }
}

export interface NotificationGroup {
  groupName: 'NEW' | 'EARLIER';
  notifications: Notification[];
}
