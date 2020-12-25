import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { News } from 'src/app/models/news/news.model';
import { NewsService } from 'src/app/services/news/news.service';
import { environment } from 'src/environments/environment';
import { SubSink } from 'subsink';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-edit-news',
  templateUrl: './add-edit-news.component.html',
  styleUrls: ['./add-edit-news.component.css']
})
export class AddEditNewsComponent implements OnInit {

  newsFormGroup: FormGroup;
  newsId: string;

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '500px',
    toolbarHiddenButtons: [
      [
        'fontName'
      ],
      [
        'customClasses',
        'link',
        'unlink',
        'insertHorizontalRule',
        'removeFormat',
      ]
    ]
  };

  private news: News;
  private subSink  = new SubSink();

  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.subSink.sink = this.route.paramMap.subscribe(async params => {
      this.newsId = params.get('id');
      if (this.newsId) {
        this.news = await this.newsService.getNewsItem(this.newsId).toPromise();
      } else {
        this.news = null;
      }
      this.generateFormGroup();
    });
  }

  generateFormGroup() {
    this.newsFormGroup = new FormGroup({
      number: new FormControl({value: this.news?.number, disabled: true}),
      title: new FormControl(this.news?.title, Validators.required),
      thumbnailImage: new FormControl(this.news?.thumbnailImage, Validators.required),
      bannerImage: new FormControl(this.news?.bannerImage, Validators.required),
      body: new FormControl(this.news?.body, Validators.required),
      views: new FormControl(this.news?.views || 0),
      active: new FormControl(this.news?.active),
      featured: new FormControl(this.news?.featured),
      order: new FormControl(this.news?.order || 1000)
    });
  }

  async save() {
    if (this.newsFormGroup.valid) {
      const news: News = {
        ...this.newsFormGroup.value,
        id: this.newsId ? this.newsId : null
      };
      if (news.id) {
        this.news = await this.newsService.updateNews(news).toPromise();
      } else {
        this.news = await this.newsService.addNews(news).toPromise();
      }
      Swal.fire('Done', 'News Saved', 'success');
      this.router.navigate(['/' + environment.adminRoutePrefix + '/news']);
    }
  }

  navigateToList() {

  }



}
