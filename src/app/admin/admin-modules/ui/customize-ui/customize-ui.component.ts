import { Component, OnInit } from '@angular/core';
import { UI } from 'src/app/models/app/ui.model';
import { VariableService } from 'src/app/services/common/variable.service';

@Component({
  selector: 'app-customize-ui',
  templateUrl: './customize-ui.component.html',
  styleUrls: ['./customize-ui.component.css']
})
export class CustomizeUiComponent implements OnInit {

  ui: UI;

  constructor(
    public varService: VariableService
  ) {
  }

  ngOnInit(): void {
    this.getUi();
  }

  async getUi() {
    this.ui = await this.varService.getUiVars().toPromise();
  }

  moveSectionOrder(i: number, direction: string) {
    if (direction === 'up') {
      if (i === 0) {
        return;
      }
      [
        this.ui.homeData.sectionOrder[i - 1],
        this.ui.homeData.sectionOrder[i]
      ] = [
        this.ui.homeData.sectionOrder[i],
        this.ui.homeData.sectionOrder[i - 1]
      ];
    } else {
      if (i === this.ui.homeData.sectionOrder.length - 1) {
        return;
      }
      [
        this.ui.homeData.sectionOrder[i],
        this.ui.homeData.sectionOrder[i + 1]
      ] = [
        this.ui.homeData.sectionOrder[i + 1],
        this.ui.homeData.sectionOrder[i]
      ];
    }

    this.updateData(this.varService.uiKeys.homeSectionOrder, this.ui.homeData.sectionOrder);

  }

  async updateData(key: string, value: any) {
    this.varService.updateUiData(key, value);
  }
}
