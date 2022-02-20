import { Component, OnDestroy, OnInit } from '@angular/core';
import { FeedService } from '@core/services/feed/feed.service';
import { Article } from '@shared/interfaces/article';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit, OnDestroy {

  searchTerm!: string;
  articles: Article[] = [];

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(public feedService: FeedService) { }

  ngOnInit(): void {

    this.feedService.articles$
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (v:Article[]) => {
          this.articles = v.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
        },
        error: (e) => console.error(e)
      });

  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
