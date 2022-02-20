import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Article } from '@shared/interfaces/article';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit, OnDestroy {

  @ViewChild('top', { static: true }) top!: ElementRef;

  article!: Article;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.params
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(params => {

        let articles: Article[] = JSON.parse(localStorage.getItem("articles") as string);
        let article = articles?.find(a => a.id === params['id']);

        if (article) {
          this.article = article;
          this.top.nativeElement.scrollIntoView();
        }
        else {
          this.router.navigate(['']);
        }

      });

  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
