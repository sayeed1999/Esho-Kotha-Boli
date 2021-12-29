import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[focus-item]'
})
export class FocusItemDirective {

  constructor(private el: ElementRef) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.el.nativeElement.style.transform = 'scale(1.25, 1.25)';
    this.el.nativeElement.style.transition = '2s ease-in-out';
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.el.nativeElement.style.transform = 'scale(1.00, 1.00)';
    this.el.nativeElement.style.transition = '2s ease-in-out';
  }

}
