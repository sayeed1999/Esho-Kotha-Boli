import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[raise-button]'
})
export class RaiseButtonDirective {

  constructor(private el: ElementRef) { }

  @HostListener('mouseenter') onMouseEnter() {
   this.el.nativeElement.style.boxShadow = '2px 2px 4px #717171';
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.el.nativeElement.style.boxShadow = '';
  }
}
