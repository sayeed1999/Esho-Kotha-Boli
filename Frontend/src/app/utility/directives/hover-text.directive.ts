import { Directive, ElementRef, HostBinding, HostListener, Input, OnInit, Renderer2 } from "@angular/core";

@Directive({
    selector: '[hover-text]'
})
export class AppHoverTextDirective implements OnInit { // only used for toolbar
    @Input('color') textColor: string = 'black';
    @HostBinding('style.transform') transform: string = '';

    constructor(private elRef: ElementRef, private renderer: Renderer2) {}

    ngOnInit(): void {
        this.renderer.setStyle(this.elRef.nativeElement, 'color', this.textColor);
    }

    @HostListener('mouseenter') onMouseEnter() {
        if(this.elRef.nativeElement.style.transform !== '') {
            // more convenient way!
            this.transform = 'translateX(0vw) rotate(359deg)';
            setTimeout(() => {
                this.transform = '';
            }, 1000);    
            return;
        }
        this.renderer.setStyle(this.elRef.nativeElement, 'transform', 'translateX(20vw)');
        setTimeout(() => {
            this.renderer.setStyle(this.elRef.nativeElement, 'transform', 'translateX(20vw) rotate(359deg)');
        }, 1000);
        this.renderer.setStyle(this.elRef.nativeElement, 'transition', '1s ease');
    }

}