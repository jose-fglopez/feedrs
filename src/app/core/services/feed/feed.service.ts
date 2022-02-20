import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CORS_PROXY, REFRESH_TIME } from '@core/core.constants';
import { Article } from '@shared/interfaces/article';
import { Feed, FeedResponse, FeedSource } from '@shared/interfaces/feed';
import { Observable, concatMap, BehaviorSubject, takeLast, take } from 'rxjs';
import * as uuid from 'uuid';
import { parseFeed, parseFeedToArticle } from './feed-parser-utils';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  // Articles BehaviourSubject to be used across components.
  private _articles$ = new BehaviorSubject<Array<Article>>([]);
  get articles$(): Observable<Array<Article>> { return this._articles$.asObservable(); }
  get articles(): Article[] { return this._articles$.getValue(); }
  set articles(articles: Article[]) {
    this._articles$.next(articles);
    localStorage.setItem("articles", JSON.stringify(this.articles));
  }

  // Sources BehaviourSubject to be used across components.
  private _sources$ = new BehaviorSubject<Array<FeedSource>>([]);
  get sources$(): Observable<Array<FeedSource>> { return this._sources$.asObservable(); }
  get sources(): FeedSource[] { return this._sources$.getValue(); }
  set sources(sources: FeedSource[]) {
    this._sources$.next(sources);
    localStorage.setItem("sources", JSON.stringify(sources));
  }

  lastUpdate!: Date;

  constructor(private http: HttpClient) {

    const localArticles = JSON.parse(localStorage.getItem("articles") as string);
    const localSources = JSON.parse(localStorage.getItem("sources") as string);
    const localLastUpdate = JSON.parse(localStorage.getItem("lastUpdate") as string);

    /* Extract articles and sources from localStorage. If no sources are provided, it
    /* will use a default one. */

    if (localArticles) this._articles$.next(localArticles)
    if (localSources) this._sources$.next(localSources);
    else {
      const defaultSources: FeedSource[] = [
        {
          title: "Xataka",
          link: "https://www.xatakandroid.com/tag/feeds/rss2.xml",
        }
      ]
      this.sources = defaultSources;
    }

    // Last update will be used so it doesn't need to constantly search for new articles on refresh
    if (localLastUpdate) {
      this.lastUpdate = new Date(localLastUpdate);
    }

  }

  /**  
 * Gets the rss xml contents using an HTTP request to the provided source
 * @param {FeedSource} source - Feed response object to parse
 */
  getFeed(source: FeedSource): void {
    this.http.get<FeedResponse>(CORS_PROXY + encodeURIComponent(source.link))
      .pipe(
        concatMap(parseFeed),
        take(1)
      )
      .subscribe({
        next: (feed: Feed) => this.updateArticles(feed, source),
        error: (e) => {
          console.error(e)
        }
      });
  }

  /**  
   * Updates the articles object using the feed object and its source
   * @param {FeedSource} source - Feed response object to parse
   */
  updateArticles(feed: Feed, source: FeedSource): void {

    // TODO: Should clean older articles in order to clear localStorage periodically

    let articles: Article[] = this.articles;
    let update: boolean = false;

    for (let item of feed.item) {

      // Updates the article if it's newer. Copies of the article are determined by their link
      let article = parseFeedToArticle(item, source);
      const index = articles.findIndex(el => el.link == article.link);

      if (index >= 0) {
        if (articles[index].pubDate < article.pubDate) {
          articles[index] = article;
          update = true;
        }
      }
      else {
        // If the article is new, assign an UID
        articles.push({ id: uuid.v4(), ...article });
        update = true;
      }
    }

    if (update) this.articles = articles;

  }

  /**  
   * Gets the feed from all source only if a certain time has passed since the last feed update
   * @param {boolean} force - Force the feed update bypassing the refresh interval
   */
  updateFeed(force: boolean = false): void {

    const refreshDate: Date | null = this.lastUpdate ? new Date(this.lastUpdate?.valueOf() + REFRESH_TIME * 60000) : null;

    if (force || !this.articles || !refreshDate || new Date() >= refreshDate) {
      for (let source of this.sources) {
        this.getFeed(source);
      }
      this.lastUpdate = new Date();
      localStorage.setItem("lastUpdate", JSON.stringify(this.lastUpdate));
    }

  }

}
