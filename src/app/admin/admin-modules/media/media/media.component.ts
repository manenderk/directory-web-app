import { Component, OnInit } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Media } from 'src/app/models/app/media.model';
import { ImageDataService } from 'src/app/services/common/image-data.service';
import { MediaService } from 'src/app/services/media/media.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css']
})
export class MediaComponent implements OnInit {

  imageFile: {
    croppedImageEvent: ImageCroppedEvent,
    file: File
  } = {
    croppedImageEvent: null,
    file: null
  };

  imageChangeEvent: any = '';

  currentAspectRatio: number;
  maintainAspectRatio: number;

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
    this.currentAspectRatio = this.imageDataService.imageTypeAspectRatio.categoryHomePage;
    this.getMedias();
  }

  async getMedias() {
    let aspectRatioToSearch = parseInt(this.search.aspectRatio, 10);
    if (isNaN(aspectRatioToSearch) || !aspectRatioToSearch) {
      aspectRatioToSearch = 0;
    }

    this.medias = await this.mediaService.getMedias(this.search.name, aspectRatioToSearch).toPromise();
    console.log(this.medias);

  }

  fileChanged(event: any) {

    if (!event.target.files[0]) {
      return;
    }
    const file: File = event.target.files[0];

    if (this.imageDataService.imageFileTypes.includes(file.type)) {
      this.imageFile.file = file;
      this.imageChangeEvent = event;
      return;
    } else {
      this.uploadFile(file);
    }
  }

  imageCropped(event: ImageCroppedEvent) {
    console.log('CROPPED IMAGE', event);
    this.imageFile.croppedImageEvent = event;
  }

  imageLoadingFailed() {
    this.resetCropper();
    Swal.fire('Error', 'Image loading failed. Please try again or try another image', 'error');
  }

  async uploadImage() {
    if (this.currentAspectRatio.toString() === '0' ) {
      this.currentAspectRatio = this.imageFile.croppedImageEvent.width / this.imageFile.croppedImageEvent.height;
    }
    const media = await this.mediaService.uploadMedia(
      null, this.imageFile.croppedImageEvent.base64, this.imageFile.file.type, this.imageFile.file.name, this.currentAspectRatio
    ).toPromise();
    this.medias.unshift(media);
    Swal.fire('Success', 'File Uploaded', 'success');
    this.resetCropper();
  }

  resetCropper() {
    this.imageChangeEvent = '';
    this.imageFile = {
      croppedImageEvent: null,
      file: null
    };
  }

  clearSearch() {
    this.search = {
      name: '',
      aspectRatio: ''
    };
    this.getMedias();
  }

  async uploadFile(file: File) {
    const media = await this.mediaService.uploadMedia(file, null, file.type, file.name, null).toPromise();
    this.medias.unshift(media);
    Swal.fire('Success', 'File Uploaded', 'success');
  }
}
