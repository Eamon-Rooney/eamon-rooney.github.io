
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';


@Injectable({providedIn: 'root'})
export class ArticleService {
  constructor(private httpClient: HttpClient) { }

  async getArticles() {
    return this.httpClient.get(environment.drupal.articles);
  }
}
