import { Injectable } from '@angular/core';
import { fromEvent, BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScreenService {

  currentScreenType: BehaviorSubject<string> = new BehaviorSubject('');
  windowHeight: number;
  windowWidth: number;

  breakpoints = {
    xs: 575,
    sm: 767,
    md: 991,
    lg: 1199,
  };

  constructor() {
    this.subscribecurrentScreenTypeUpdates();
  }

  getWindowWidth(): number {
    return window.innerWidth;
  }

  getWindowHeight(): number {
    return window.innerHeight;
  }

  subscribecurrentScreenTypeUpdates() {
    this.setCurrentScreenType();
    fromEvent(window, 'resize').pipe(
      debounceTime(500)
    ).subscribe(() => {
      this.setCurrentScreenType()
    })
  }


  private setCurrentScreenType(): void {
    const width: number = window.innerWidth;
    let type = 'xl';
    if (width <= this.breakpoints.xs) {
      type = 'xs';
    } else if (width <= this.breakpoints.sm) {
      type = 'sm';
    } else if (width <= this.breakpoints.md) {
      type = 'md';
    } else if (width <= this.breakpoints.lg) {
      type = 'lg'
    }
    console.log('New screen type determined as: ' + type);
    this.currentScreenType.next(type);
  }


}
