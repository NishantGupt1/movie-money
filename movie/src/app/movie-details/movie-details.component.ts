import { Component, OnInit } from '@angular/core';
import { SearchService, Response } from '../search.service'
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common'
@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  constructor(private searchService: SearchService, private datePipe: DatePipe) { }
  
  movieTitle: string = 'Test'
  posterPath: string = 'https://image.shutterstock.com/image-photo/white-transparent-leaf-on-mirror-260nw-1029171697.jpg'
  releaseDate: string = '1-1-2000'
  movieDescription: string = 'movie description'
  ngOnInit(): void {
    
    this.searchService.movie$.subscribe(movieData => {
      console.log('hello')
      if(movieData) {
        console.log('grabbing movie details..')
      this.movieTitle = movieData.title || ''
      this.posterPath = 'https://image.tmdb.org/t/p/w500' + movieData.poster_path
      this.releaseDate = this.datePipe.transform(movieData.release_date, 'dd/MM/yyyy')
      this.movieDescription = movieData.overview
      console.log(this.posterPath)
      }
      // this.movieTitle = response.results[0].original_title
    })
  }

}
