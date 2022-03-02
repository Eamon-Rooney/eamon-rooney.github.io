import { Component, OnInit } from '@angular/core';
import { ArticleService } from './article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  constructor(private _articleService: ArticleService) { }

  articles: any;

  async ngOnInit() {
    (await this._articleService.getArticles())
    .subscribe(response =>
      this.articles = response
    );
  }
}
