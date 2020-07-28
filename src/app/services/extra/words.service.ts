import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WordsService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getRandomWords(length: number): Observable<string[]> {
    return this.httpClient.get<string[]>(`https://random-word-api.herokuapp.com/word?number=${length}`);
  }
}
