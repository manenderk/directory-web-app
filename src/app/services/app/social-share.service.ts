import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SocialShareService {

  platforms = [
    'facebook',
    'instagram',
    'twitter',
    'youtube'
  ];

  constructor() { }
}
