import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticlePageService } from './article-page.service';

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.scss']
})
export class ArticlePageComponent implements OnInit {

  articlePage: any;

  constructor(private _articlePageService: ArticlePageService,
    private router: Router) { }

  async ngOnInit() {
    let id = this.router.routerState.snapshot.root.children[0].params.id;
console.log(id);
    (await this._articlePageService.getArticlePage(id))
    .subscribe(response =>
      this.articlePage = response
    );
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
    return false;
    }
  }
}
