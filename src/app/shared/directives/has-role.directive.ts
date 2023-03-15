import { Subscription } from 'rxjs';
import { SharedUtilityComponent } from './../components/shared-utility/shared-utility.component';
import { AppUser } from 'src/app/shared/core/models/app-user';
import { EventBusService } from './../services/common/event-bus/event-bus.service';
import { Directive, Input, OnInit, OnDestroy, ElementRef, Renderer2 } from '@angular/core';
import { EventBusActions } from '../services/common/event-bus/event-bus-action';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective implements OnInit, OnDestroy {

  @Input() roles: string[] = [];
  @Input() operator: string = 'or';

  currentUser?: AppUser;
  subscriptions: Subscription[] = [];
  classes = '';

  constructor(
    private eventBus: EventBusService,
    private elementRef: ElementRef,
    private renderer: Renderer2,
  ) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.currentUser = this.eventBus.getState().user.value ?? {} as AppUser;
    this.listenForChanges();
    this.checkRole();
  }

  listenForChanges(): void {
    const userSub = this.eventBus.on(EventBusActions.state.currentUser, (user: AppUser) => {
      this.currentUser = user;
      this.checkRole();
    });

    this.subscriptions.push(userSub);
  }

  checkRole(): void {
    const list: string[] = this.elementRef.nativeElement.classList;
    let classes: string[] = [];
    list.forEach(element => {
      classes.push(element);
    });

    this.classes = classes.join(' ');
    if (!this.currentUser) {
      this.hideElement();
      return;
    }

    if (this.roles.length <= 0) {

      this.hideElement();
      return;
    }

    let hasRole: boolean[] = [];
    this.roles.forEach(x => {
      var role = this.currentUser?.userRoles?.find(a => a === x);
      if (role) {
        hasRole.push(true);
      } else {
        hasRole.push(false);
      }
    });

    if (this.operator === 'and') {
      if (!hasRole.every(Boolean)) {
      this.hideElement();
      } else {
        this.showElement();
      }
    } else {
      if (!hasRole.some(Boolean)) {
      this.hideElement();
      } else {
        this.showElement();
      }
    }

  }

  hideElement(): void {
    this.renderer.removeClass(this.elementRef.nativeElement, 'd-block');
    this.renderer.addClass(this.elementRef.nativeElement, 'd-none');
  }

  showElement(): void {
    this.renderer.removeClass(this.elementRef.nativeElement, 'd-none');
    this.renderer.addClass(this.elementRef.nativeElement, 'd-block');
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(x => x.unsubscribe());
  }
}
