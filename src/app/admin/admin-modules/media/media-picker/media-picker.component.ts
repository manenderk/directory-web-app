import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatMenuTrigger } from '@angular/material/menu';
import { Media } from 'src/app/models/app/media.model';
import { ImageDataService } from 'src/app/services/common/image-data.service';
import { MediaService } from 'src/app/services/media/media.service';

@Component({
  selector: 'app-media-picker',
  templateUrl: './media-picker.component.html',
  styleUrls: ['./media-picker.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: MediaPickerComponent, multi: true }
  ]
})
export class MediaPickerComponent implements OnInit, ControlValueAccessor {

  selectedMedia: Media;
  selectedMedias: Media[];

  @Input() pickerType = 'single';

  isPickerOpen = false;

  medias: Media[];

  search = {
    name: '',
    aspectRatio: ''
  };

  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;

  contextMenuPosition = {x: '0px', y: '0px'};

  private onChange: (selection: any) => void;

  constructor(
    public imageDataService: ImageDataService,
    private mediaService: MediaService
  ) { }

  ngOnInit(): void {
    this.initializeVariables();
  }

  initializeVariables() {
    this.getMedias();
  }

  async getMedias() {
    let aspectRatioToSearch = parseInt(this.search.aspectRatio, 10);
    if (isNaN(aspectRatioToSearch) || !aspectRatioToSearch) {
      aspectRatioToSearch = 0;
    }
    this.medias = await this.mediaService.getMedias(this.search.name, aspectRatioToSearch).toPromise();
  }

  clearSearch() {
    this.search = {
      name: '',
      aspectRatio: ''
    };
    this.getMedias();
  }

  writeValue(selection: Media | Media[]) {
    if (this.pickerType === 'single') {
      this.selectedMedia = JSON.parse(JSON.stringify(selection));
    } else {
      if (selection) {
        this.selectedMedias = JSON.parse(JSON.stringify(selection));
      } else {
        this.selectedMedias = [];
      }
    }
  }

  registerOnChange(onChange: (selection: Media | Media[]) => void) {
    this.onChange = onChange;
  }

  registerOnTouched() {}

  selectMedia(media: Media) {
    this.isPickerOpen = false;
    if (this.pickerType === 'single') {
      this.selectedMedia = media;
      this.onChange(this.selectedMedia);
    } else {
      this.selectedMedias.push(media);
      this.onChange(this.selectedMedias);
    }
  }

  removeSelection(media: Media) {
    if (this.pickerType === 'single') {
      this.selectedMedia = null;
      this.onChange(null);
    } else {
      this.selectedMedias = this.selectedMedias.filter(m => m.id !== media.id);
      this.onChange(this.selectedMedias);
    }
  }

  clearSelection() {
    this.selectedMedia = null;
    this.selectedMedias = [];
  }

  onContextMenu(event: MouseEvent, media: Media) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = { media };
    this.contextMenu.menu.focusFirstItem('mouse');
    this.contextMenu.openMenu();
  }
}
