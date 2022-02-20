import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleListComponent } from './article-list/article-list.component';
import { HomeComponent } from './home.component';

const routes: Routes = [{ 
  path: '', component: HomeComponent,
  children: [{
    path: '',
    component: ArticleListComponent
  }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
