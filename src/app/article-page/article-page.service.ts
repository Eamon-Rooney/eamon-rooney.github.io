
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class ArticlePageService {
  constructor(private httpClient: HttpClient) { }

  async getArticlePage(id: any) {
    return this.httpClient.get(environment.drupal.articlePage + id);
  }
}
