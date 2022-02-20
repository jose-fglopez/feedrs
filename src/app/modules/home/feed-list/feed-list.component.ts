import { Component, OnDestroy, OnInit } from '@angular/core';
import { FeedService } from '@core/services/feed/feed.service';
import { Article } from '@shared/interfaces/article';
import { FeedSource } from '@shared/interfaces/feed';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-feed-list',
  templateUrl: './feed-list.component.html',
  styleUrls: ['./feed-list.component.scss']
})
export class FeedListComponent implements OnInit, OnDestroy {

  sources: FeedSource[] = [];
  articles: Article[] = [];

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(public feedService: FeedService) { }

  ngOnInit(): void {

    this.feedService.articles$
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (v) => {
          this.articles = v.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
        },
        error: (e) => console.error(e)
      });

    this.feedService.sources$
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (v) => this.sources = v,
        error: (e) => console.error(e)
      });

  }

  getArticlesBySource(source: FeedSource) {
    return this.articles.filter(article => article.source.link === source.link)
  }

  deleteSource(source: FeedSource) {
    this.feedService.deleteSource(source)
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
