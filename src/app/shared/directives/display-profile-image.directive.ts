import { Directive, ElementRef, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppUser } from '../core/models/app-user';
import { EventBusService } from '../services/common/event-bus/event-bus.service';

@Directive({
  selector: '[appDisplayProfileImage]'
})
export class DisplayProfileImageDirective implements OnInit, OnChanges, OnDestroy {

  @Input() imgSrc?: string;
  @Input() profile = 'profile';

  defaultImg = '/assets/images/blank-profile-pic.png'

  subscriptions: Subscription[] = [];

  constructor(
    private el: ElementRef,
    private eventBus: EventBusService
    ) {
  }

  ngOnInit(): void {
    this.setProfile();
    this.listenForNewProfileImage();
    this.handleMedia();
  }

  ngOnChanges(): void {
    this.handleMedia();
  }

  handleMedia(): void {
    const img = this.imgSrc || this.defaultImg;
    this.el.nativeElement.src = img;
  }

  listenForNewProfileImage(): void {
    // const currentUser = this.eventBus.state.user;
    // const sub = this.eventBus.on(AppEventBus.file.profilePicture, (user: AppUser) => {
    //   if (user.id == currentUser.id)
    //   {
    //     this.imgSrc = user.media.profilePicture.url;
    //     this.handleMedia();
    //   }
    // });

    // this.subscriptions.push(sub);
  }

  setProfile(): void {
    switch (this.profile) {
      case 'profile':
        this.defaultImg = '/assets/images/blank-profile-pic.png'
        break;
      case 'inventory':
        this.defaultImg = '/assets/images/inventory.svg'
        break;
      default:
        this.defaultImg = '/assets/images/blank-profile-pic.png'
        break;
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(x => x.unsubscribe());
  }

}
