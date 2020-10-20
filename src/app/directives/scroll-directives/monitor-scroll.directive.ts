import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appMonitorScroll]'
})
export class MonitorScrollDirective {

  private window = window;

  private scrollDirection: number; // 0 = up; 1 = down
  private lastScrollTop = 0;

  @Output() scrolledUp: EventEmitter<boolean> = new EventEmitter();
  @Output() scrolledDown: EventEmitter<boolean> = new EventEmitter();

  constructor(private el: ElementRef) { }

  @HostListener('scroll', ['$event']) onScroll(event: UIEvent) {
    const st = this.window.pageYOffset || this.el.nativeElement.scrollTop;
    if (st > this.lastScrollTop && this.scrollDirection !== 1){
        this.scrollDirection = 1;
        this.scrolledDown.emit(true);
    } else if (st < this.lastScrollTop && this.scrollDirection !== 0){
        this.scrollDirection = 0;
        this.scrolledUp.emit(true);
    }
    this.lastScrollTop = st <= 0 ? 0 : st;
  }
}
