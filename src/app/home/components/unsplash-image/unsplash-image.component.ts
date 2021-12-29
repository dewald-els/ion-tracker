import {
  UnsplashService,
  UnsplashResponse,
} from './../../services/unsplash.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-unsplash-image',
  templateUrl: './unsplash-image.component.html',
  styleUrls: ['./unsplash-image.component.scss'],
})
export class UnsplashImageComponent implements OnInit {
  public image = '';

  constructor(private readonly unsplashService: UnsplashService) {}

  ngOnInit() {
    this.image =
      'https://images.unsplash.com/photo-1640005772122-745f8d7d2afd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyODY5NTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NDA4MTg5MDg&ixlib=rb-1.2.1&q=80&w=1080';
    return;
    this.unsplashService.getRandomPhoto().subscribe({
      next: (unsplash: UnsplashResponse) => {
        this.image = unsplash.image;
      },
    });
  }
}
