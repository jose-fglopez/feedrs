import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleComponent } from './article/article.component';
import { HomeComponent } from './home.component';

const routes: Routes = [{ 
  path: '', component: HomeComponent,
  children: [{
    path: '',
    component: ArticleListComponent
  },
  {
    path: 'article/:id',
    component: ArticleComponent
  },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
