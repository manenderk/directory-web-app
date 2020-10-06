import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'directory-web-app';

  subsink = new SubSink();

  constructor(
    private router: Router
  ) {}

  ngOnInit() {
    this.subsink.sink = this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0);
    });
  }

  ngOnDestroy() {
    this.subsink.unsubscribe();
  }
}
