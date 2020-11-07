import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UI } from 'src/app/models/app/ui.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VariableService {


  uiKeys = {
    homeSectionOrder: 'homeSectionOrder',
    homeCatDeskRow: 'homeCategoryDesktopRow',
    homeCatDeskCol: 'homeCategoryDesktopCol',
    homeCatTabRow: 'homeCategoryTabletRow',
    homeCatTabCol: 'homeCategoryTabletCol',
    homeCatMobRow: 'homeCategoryMobileRow',
    homeCatMobCol: 'homeCategoryMobileCol',
    homeEventDeskRow: 'homeEventDesktopRow',
    homeEventDeskCol: 'homeEventDesktopCol',
    homeEventTabRow: 'homeEventTabletRow',
    homeEventTabCol: 'homeEventTabletCol',
    homeEventMobRow: 'homeEventMobileRow',
    homeEventMobCol: 'homeEventMobileCol',
    homeNewsDeskRow: 'homeNewsDesktopRow',
    homeNewsDeskCol: 'homeNewsDesktopCol',
    homeNewsTabRow: 'homeNewsTabletRow',
    homeNewsTabCol: 'homeNewsTabletCol',
    homeNewsMobRow: 'homeNewsMobileRow',
    homeNewsMobCol: 'homeNewsMobileCol',
  };

  toggleScreenType = ['xs', 'sm'];
  toggleScreenTypeDesktop = ['xs', 'sm', 'md'];

  ui: UI = {
    homeData: {
      sectionOrder: ['category', 'event', 'news'],
      category: {
        desktop: {
          rows: 2,
          cols: 5,
        },
        tablet: {
          rows: 2,
          cols: 4,
        },
        mobile: {
          rows: 2,
          cols: 3,
        },
      },
      event: {
        desktop: {
          rows: 2,
          cols: 5,
        },
        tablet: {
          rows: 2,
          cols: 4,
        },
        mobile: {
          rows: 2,
          cols: 3,
        },
      },
      news: {
        desktop: {
          rows: 2,
          cols: 5,
        },
        tablet: {
          rows: 2,
          cols: 4,
        },
        mobile: {
          rows: 2,
          cols: 3,
        },
      },
    },
  };

  constructor(
    private httpClient: HttpClient
  ) { }

  getUiVars(): Observable<UI> {
    const url = environment.apiHost + 'ui/get-customizations';
    return this.httpClient.get(url).pipe(
      map((data: any[]) => {
        return this.mapResponseToUiModel(data);
      })
    );
  }

  private mapResponseToUiModel(uiData: any[]): UI {
    const data = [];
    uiData.forEach(d => {
      data[d.key] = d.value;
    });
    const ui: UI = {
      homeData: {
        sectionOrder: data[this.uiKeys.homeSectionOrder] || this.ui.homeData.sectionOrder,
        category: {
          desktop: {
            rows: data[this.uiKeys.homeCatDeskRow] || this.ui.homeData.category.desktop.rows,
            cols: data[this.uiKeys.homeCatDeskCol] || this.ui.homeData.category.desktop.cols
          },
          tablet: {
            rows: data[this.uiKeys.homeCatTabRow] || this.ui.homeData.category.tablet.rows,
            cols: data[this.uiKeys.homeCatTabCol] || this.ui.homeData.category.tablet.cols
          },
          mobile: {
            rows: data[this.uiKeys.homeCatMobRow] || this.ui.homeData.category.mobile.rows,
            cols: data[this.uiKeys.homeCatMobCol] || this.ui.homeData.category.mobile.cols
          }
        },
        event: {
          desktop: {
            rows: data[this.uiKeys.homeEventDeskRow] || this.ui.homeData.event.desktop.rows,
            cols: data[this.uiKeys.homeEventDeskCol] || this.ui.homeData.event.desktop.cols
          },
          tablet: {
            rows: data[this.uiKeys.homeEventTabRow] || this.ui.homeData.event.tablet.rows,
            cols: data[this.uiKeys.homeEventTabCol] || this.ui.homeData.event.tablet.cols
          },
          mobile: {
            rows: data[this.uiKeys.homeEventMobRow] || this.ui.homeData.event.mobile.rows,
            cols: data[this.uiKeys.homeEventMobCol] || this.ui.homeData.event.mobile.cols
          }
        },
        news: {
          desktop: {
            rows: data[this.uiKeys.homeNewsDeskRow] || this.ui.homeData.news.desktop.rows,
            cols: data[this.uiKeys.homeNewsDeskCol] || this.ui.homeData.news.desktop.cols
          },
          tablet: {
            rows: data[this.uiKeys.homeNewsTabRow] || this.ui.homeData.news.tablet.rows,
            cols: data[this.uiKeys.homeNewsTabCol] || this.ui.homeData.news.tablet.cols
          },
          mobile: {
            rows: data[this.uiKeys.homeNewsMobRow] || this.ui.homeData.news.mobile.rows,
            cols: data[this.uiKeys.homeNewsMobCol] || this.ui.homeData.news.mobile.cols
          }
        }
      }
    };
    return ui;
  }

  async updateUiData(key: string, value: any): Promise<UI> {
    const url = environment.apiHost + 'ui/update-customization';
    const postData = {
      key,
      value,
    };
    await this.httpClient.put(url, postData).toPromise();
    switch (key) {
      case this.uiKeys.homeSectionOrder:
        this.ui.homeData.sectionOrder = value;
        break;
      case this.uiKeys.homeCatDeskRow:
        this.ui.homeData.category.desktop.rows = value;
        break;
      case this.uiKeys.homeCatDeskCol:
        this.ui.homeData.category.desktop.cols = value;
        break;
      case this.uiKeys.homeCatTabRow:
        this.ui.homeData.category.tablet.rows = value;
        break;
      case this.uiKeys.homeCatTabCol:
        this.ui.homeData.category.tablet.cols = value;
        break;
      case this.uiKeys.homeCatMobRow:
        this.ui.homeData.category.mobile.rows = value;
        break;
      case this.uiKeys.homeCatMobCol:
        this.ui.homeData.category.mobile.cols = value;
        break;
      case this.uiKeys.homeEventDeskRow:
        this.ui.homeData.event.desktop.rows = value;
        break;
      case this.uiKeys.homeEventDeskCol:
        this.ui.homeData.event.desktop.cols = value;
        break;
      case this.uiKeys.homeEventTabRow:
        this.ui.homeData.event.tablet.rows = value;
        break;
      case this.uiKeys.homeEventTabCol:
        this.ui.homeData.event.tablet.cols = value;
        break;
      case this.uiKeys.homeEventMobRow:
        this.ui.homeData.event.mobile.rows = value;
        break;
      case this.uiKeys.homeEventMobCol:
        this.ui.homeData.event.mobile.cols = value;
        break;
      case this.uiKeys.homeNewsDeskRow:
        this.ui.homeData.news.desktop.rows = value;
        break;
      case this.uiKeys.homeNewsDeskCol:
        this.ui.homeData.news.desktop.cols = value;
        break;
      case this.uiKeys.homeNewsTabRow:
        this.ui.homeData.news.tablet.rows = value;
        break;
      case this.uiKeys.homeNewsTabCol:
        this.ui.homeData.news.tablet.cols = value;
        break;
      case this.uiKeys.homeNewsMobRow:
        this.ui.homeData.news.mobile.rows = value;
        break;
      case this.uiKeys.homeNewsMobCol:
        this.ui.homeData.news.mobile.cols = value;
        break;
    }

    return this.ui;
  }



}
