import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlePageComponent } from './article-page/article-page.component';
import { ArticleComponent } from './article/article.component';

const routes: Routes = [
  { path: 'article/:id', component: ArticlePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
