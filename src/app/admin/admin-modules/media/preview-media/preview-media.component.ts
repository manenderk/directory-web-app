import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Media } from 'src/app/models/app/media.model';
import { ImageDataService } from 'src/app/services/common/image-data.service';
import { MediaService } from 'src/app/services/media/media.service';

@Component({
  selector: 'app-preview-media',
  templateUrl: './preview-media.component.html',
  styleUrls: ['./preview-media.component.css']
})
export class PreviewMediaComponent implements OnInit, OnChanges {

  @Input() mediaId: string;

  media: Media;

  constructor(
    private mediaService: MediaService,
    public imageDataService: ImageDataService
  ) { }

  ngOnInit(): void {
  }

  async ngOnChanges() {
    if (!this.mediaId) {
      this.media = null;
      return;
    }
    this.media = await this.mediaService.getMedia(this.mediaId).toPromise();
  }



}
