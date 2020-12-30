import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Media } from 'src/app/models/app/media.model';
import { ImageDataService } from 'src/app/services/common/image-data.service';
import { MediaService } from 'src/app/services/media/media.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-media-uploader',
  templateUrl: './media-uploader.component.html',
  styleUrls: ['./media-uploader.component.css']
})
export class MediaUploaderComponent implements OnInit {

  imageValidations = {
    width: 1000,
    height: 500
  };

  imageCropper: {
    changeEvent: any,
    cropEvent: ImageCroppedEvent,
    file: File,
    resizeWidth: number,
    resizeHeight: number,
  } = {
    changeEvent: null,
    cropEvent: null,
    file: null,
    resizeWidth: 0,
    resizeHeight: 0
  };

  currentAspectRatio: number;
  maintainAspectRatio: number;

  @Output() mediaUploaded: EventEmitter<Media> = new EventEmitter();

  constructor(
    public imageDataService: ImageDataService,
    private mediaService: MediaService
  ) { }

  ngOnInit(): void {
    this.currentAspectRatio = this.imageDataService.imageTypeAspectRatio.categoryHomePage;
  }

  fileChanged(event: any) {

    if (!event.target.files[0]) {
      return;
    }
    const file: File = event.target.files[0];

    if (this.imageDataService.imageFileTypes.includes(file.type)) {
      this.imageCropper = {
        changeEvent: event,
        cropEvent: null,
        file: null,
        resizeWidth: 0,
        resizeHeight: 0
      };
      return;
    } else {
      this.uploadFile(file);
    }
  }

  imageLoaded(image: any) {
    const imageWidth: number = image.original.size.width;
    const imageHeight: number = image.original.size.height;

    this.imageCropper.resizeWidth = imageWidth < this.imageValidations.width ? imageWidth : this.imageValidations.width;
    this.imageCropper.resizeHeight = imageHeight < this.imageValidations.height ? imageHeight : this.imageValidations.height;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.imageCropper.cropEvent = event;
    const imageBase64 = event.base64.replace('data:image/png;base64,', '');
    let imageName: any = this.imageCropper.changeEvent.target.files[0].name;
    imageName = imageName.split('.');
    imageName.pop();
    imageName.push('png');
    imageName = imageName.join('.');
    const imageBlob = this.dataURItoBlob(imageBase64);
    this.imageCropper.file = new File([imageBlob], imageName, { type: 'image/png' });
  }

  imageLoadingFailed() {
    this.resetCropper();
    Swal.fire('Error', 'Image loading failed. Please try again or try another image', 'error');
  }

  async uploadFile(file?: File) {
    if (!file && !this.imageCropper.file) {
      Swal.fire('Error', 'No input file', 'error');
      return;
    }
    if (!file && this.imageCropper.file) {
      file = this.imageCropper.file;
      this.resetCropper();
    }

    const media = await this.mediaService.uploadMedia(file, null, file.type, file.name, null).toPromise();
    this.mediaUploaded.emit(media);
    Swal.fire('Success', 'File Uploaded', 'success');
  }

  resetCropper() {
    this.imageCropper = {
      changeEvent: null,
      cropEvent: null,
      file: null,
      resizeWidth: 0,
      resizeHeight: 0
    }
  }

  private dataURItoBlob(dataURI: string) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/png' });
    return blob;
  }

}
