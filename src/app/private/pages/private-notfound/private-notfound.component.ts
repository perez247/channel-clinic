import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'

@Component({
  selector: 'app-private-notfound',
  templateUrl: './private-notfound.component.html',
  styleUrls: ['./private-notfound.component.scss']
})
export class PrivateNotfoundComponent implements OnInit {

  errorMessage?: string;

  constructor(
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.errorMessage = this.route.snapshot.paramMap.get('error') ?? 'What you are looking for could not be found';
  }

  goBack() {
    this.location.back();
  }

}
