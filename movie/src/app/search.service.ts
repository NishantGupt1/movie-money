import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }
  public movie$: BehaviorSubject<any> = new BehaviorSubject({original_title: 'Marvel'});

  getMovies(userMovieInput: string) {
    console.log('calling movies api: ')
    if(userMovieInput) {
    return this.http.get<any>(`https://api.themoviedb.org/3/search/movie?api_key=963cd8446c76408a7d894b3dec82bc1d&&language=en-US&query=${userMovieInput}&page=1&include_adult=false`).subscribe(movie => {
      if(movie.results[0]) {
        this.http.get<any>(`https://api.themoviedb.org/3/movie/${movie.results[0].id}?api_key=963cd8446c76408a7d894b3dec82bc1d&language=en-US`).subscribe(movieData => {
          this.movie$.next(movieData)
          console.log('emitted behaviorSubject')
          console.log(movieData)
        })
      
      }
    })
  }
  }
}


export interface Response {
  page: number
  results: Results[]
  total_pages: number
  total_results: number
}

interface Results {
  adult: boolean
  backdrop_path: string
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}
