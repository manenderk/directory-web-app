import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';

@Pipe({
  name: 'previewImage'
})
export class PreviewImagePipe implements PipeTransform {

  transform(file: File): Observable<string> {
    return new Observable<string>((observer) => {
      // This is a tiny blank image
      observer.next('data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==');

      // The next and error callbacks from the observer
      const {next, error} = observer;

      const reader = new FileReader();
      reader.onload = () => {
        const imagePreview = reader.result as string;
        observer.next(imagePreview);
      };
      reader.readAsDataURL(file);

      return {unsubscribe() {  }};
    });
  }

  private previewImage(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      let imagePreview: string;
      const reader = new FileReader();
      reader.onload = () => {
        imagePreview = reader.result as string;
        resolve(imagePreview);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

}
