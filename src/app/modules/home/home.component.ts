import { Component, OnInit } from '@angular/core';
import { FeedService } from '@core/services/feed/feed.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  menuActive: boolean = false;

  constructor(public feedService: FeedService) { }

  ngOnInit(): void {
    this.feedService.updateFeed();
  }

}
