import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FeedService } from '@core/services/feed/feed.service';

@Component({
  selector: 'app-add-feed',
  templateUrl: './add-feed.component.html',
  styleUrls: ['./add-feed.component.scss']
})
export class AddFeedComponent implements OnInit {

  constructor(public feedService: FeedService) { }

  feedForm = new FormGroup({
    title: new FormControl('', Validators.required),
    link: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.feedForm.valid) {
      this.feedService.addSource(this.feedForm.value);
      this.feedForm.reset()
    }
  }

}
