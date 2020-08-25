import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-image-input-preview',
  templateUrl: './image-input-preview.component.html',
  styleUrls: ['./image-input-preview.component.css']
})
export class ImageInputPreviewComponent implements OnInit, OnChanges {

  @Input() maxFiles = 1;
  @Input() allowedFileTypes: string[] = [];
  @Input() maxFileSize = 1; // 1 MB;

  @Input() showImagePreview = false;
  @Input() previousFiles: string[];

  @Input() reset: Observable<boolean>;

  @Output() filesAdded: EventEmitter<File[]> = new EventEmitter();

  errorMessages: string[] = [];
  addedFiles: File[] = [];

  constructor() {


  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if (this.reset) {
      this.reset.subscribe((doReset: boolean) => {
        if (doReset) {
          this.addedFiles = [];
          this.errorMessages = [];
        }
      });
    }
  }

  fileInputChanged(event: any) {
    this.addedFiles = Array.from(event.target.files);
    console.log(this.addedFiles);
    this.validateFiles();
    if (this.addedFiles.length > 0) {
      this.filesAdded.emit(this.addedFiles);
    }
  }

  private validateFiles() {
    this.resetErrorMessages();
    if (!this.validFileCount) {
      this.errorMessages.push(`Only ${this.maxFiles} files are allowed to upload.`);
    }
    this.addedFiles.forEach(file => {
      const fileName = file.name;
      if (!this.validFileSize(file)) {
        this.errorMessages.push(`File ${fileName} exceedes ${this.maxFileSize} MB. Upload a file less than ${this.maxFileSize} MB.`);
      }
      if (!this.validFileType(file)) {
        this.errorMessages.push(`File ${fileName} is not a valid file. Only ${this.allowedFileTypes.join(', ')} files can be uploaded`);
      }
    });

    if (this.errorMessages.length > 0) {
      this.addedFiles = [];
    }
  }

  private validFileCount(): boolean {
    return this.addedFiles.length <= this.maxFiles ? true : false;
  }

  private validFileSize(file: File): boolean {
    const maxFileSizeInKB = this.maxFileSize * 1024;
    const currentFileSizeInKB = file.size / 1024;

    return currentFileSizeInKB <= maxFileSizeInKB ? true : false;
  }

  private validFileType(file: File): boolean {
    if (this.allowedFileTypes.length === 0) {
      return true;
    }

    const fileName = file.name;
    const index = fileName.lastIndexOf('.');
    const fileExtention = fileName.substring(index + 1, fileName.length);
    return this.allowedFileTypes.includes(fileExtention);
  }

  private resetErrorMessages() {
    this.errorMessages = [];
  }
}
