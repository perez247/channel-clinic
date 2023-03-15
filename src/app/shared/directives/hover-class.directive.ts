import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHoverClass]'
})
export class HoverClassDirective {

  constructor(public elementRef: ElementRef) { }
  @Input('hover-class') hoverClass: string = '';

  @HostListener('mouseenter') onMouseEnter() {
      const classList = this.hoverClass.split(' ');
      classList.forEach(x => {
        this.elementRef.nativeElement.classList.add(x);
      })
  }

  @HostListener('mouseleave') onMouseLeave() {
    const classList = this.hoverClass.split(' ');
    classList.forEach(x => {
      this.elementRef.nativeElement.classList.remove(x);
    })
  }

}
