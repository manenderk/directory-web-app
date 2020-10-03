import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Media } from 'src/app/models/app/media.model';
import { ImageDataService } from 'src/app/services/common/image-data.service';

@Component({
  selector: 'app-media-item',
  templateUrl: './media-item.component.html',
  styleUrls: ['./media-item.component.css']
})
export class MediaItemComponent implements OnInit {

  @Input() media: Media;

  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;

  contextMenuPosition = { x: '0px', y: '0px' };

  constructor(
    public imageDataService: ImageDataService
  ) { }

  ngOnInit(): void {
  }

  onContextMenu(event: MouseEvent, media: Media) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = { media };
    this.contextMenu.menu.focusFirstItem('mouse');
    this.contextMenu.openMenu();
  }

  getRatio(ratio: number): string {
    if (!ratio) {
      return '';
    }
    const data = this.imageDataService.aspectRatios.find(r => r.ratio === ratio);
    if (data) {
      return data.displayratio;
    }
    return ratio.toString();
  }

}
