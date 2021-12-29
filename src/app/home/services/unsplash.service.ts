import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
const { unsplashServiceAPI } = environment;

export interface UnsplashResponse {
  image: string;
}

@Injectable({
  providedIn: 'root',
})
export class UnsplashService {
  constructor(private readonly http: HttpClient) {}

  getRandomPhoto(): Observable<UnsplashResponse> {
    return this.http.get<UnsplashResponse>(
      `${unsplashServiceAPI}/unsplash/random`
    );
  }
}
