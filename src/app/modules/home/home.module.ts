import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from '@shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleComponent } from './article/article.component';
import { FeedListComponent } from './feed-list/feed-list.component';
import { AddFeedComponent } from './add-feed/add-feed.component';

@NgModule({
  declarations: [
    HomeComponent,
    ArticleListComponent,
    ArticleComponent,
    FeedListComponent,
    AddFeedComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class HomeModule { }
