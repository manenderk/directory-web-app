import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Media } from 'src/app/models/app/media.model';
import { ImageDataService } from 'src/app/services/common/image-data.service';
import { MediaService } from 'src/app/services/media/media.service';

@Component({
  selector: 'app-media-picker',
  templateUrl: './media-picker.component.html',
  styleUrls: ['./media-picker.component.css']
})
export class MediaPickerComponent implements OnInit {

  @Output() fileSelected: EventEmitter<Media> = new EventEmitter();

  selectedMedia: Media;

  isPickerOpen = false;

  medias: Media[];

  search = {
    name: '',
    aspectRatio: ''
  };

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

  selectMedia(media: Media) {
    this.selectedMedia = media;
    this.selectedMediaChanged();
    this.isPickerOpen = false;
  }

  clearSelection() {
    this.selectedMedia = null;
    this.selectedMediaChanged();
  }

  selectedMediaChanged() {
    this.fileSelected.emit(this.selectedMedia);
  }
}
