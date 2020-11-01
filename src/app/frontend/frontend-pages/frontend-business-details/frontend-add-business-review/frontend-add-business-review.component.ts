import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-frontend-add-business-review',
  templateUrl: './frontend-add-business-review.component.html',
  styleUrls: ['./frontend-add-business-review.component.css']
})
export class FrontendAddBusinessReviewComponent implements OnInit {

  @Input() show = false;
  @Output() showChange: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  close() {
    this.show = false;
    this.showChange.emit(this.show);
  }

}
