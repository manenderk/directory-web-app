import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScreenService {


  window = window;
  windowHeight: number;
  windowWidth: number;

  breakpoints = {
    xs: 575,
    sm: 767,
    md: 991,
    lg: 1199,
  };


  constructor(

  ) {}

  getWindowWidth(): number {
    return window.innerWidth;
  }

  getWindowHeight(): number {
    return window.innerHeight;
  }

  getScreenType(): string {
    const width: number = window.innerWidth;

    if (width <= this.breakpoints.xs) {
      return 'xs';
    } else if (width <= this.breakpoints.sm) {
      return 'sm';
    } else if (width <= this.breakpoints.md) {
      return 'md';
    } else if (width <= this.breakpoints.lg) {
      return 'lg'
    } else {
      return 'xl';
    }
  }



}
