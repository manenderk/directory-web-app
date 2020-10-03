import { Component, OnInit, ViewChild } from '@angular/core';
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
  isPickerOpen = false;
  medias: Media[];
  search = {
    name: '',
    aspectRatio: ''
  };

  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;

  contextMenuPosition = { x: '0px', y: '0px' };

  private onChange: (media: Media) => void;

  constructor(
    public imageDataService: ImageDataService,
    private mediaService: MediaService
  ) { }

  ngOnInit(): void {
    this.initializeVariables();
  }

  writeValue(media: Media) {
    this.selectedMedia = media;
  }

  registerOnChange(onChange: (media: Media) => void) {
    this.onChange = onChange;
  }

  registerOnTouched() {}

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

  selectMedia(media: Media = null) {
    this.isPickerOpen = false;
    this.selectedMedia = media;
    this.onChange(media);
  }

  clearSelection() {
    this.selectedMedia = null;
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
