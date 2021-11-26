import { Component, OnDestroy, OnInit } from '@angular/core';
import { searchedFilm } from '../models/searchedfilm.model';
import { MoviesService } from '../movies.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css']
})
export class MovieSearchComponent implements OnInit, OnDestroy {
  private searchSub!: Subscription;
  private query = ""
  movies: searchedFilm[] = []

  constructor(private movieService: MoviesService) { }
  ngOnDestroy() {
    this.searchSub.unsubscribe()
  }

  ngOnInit(): void {
    this.searchSub = this.movieService.getSearch()
      .subscribe((films: searchedFilm[]) => {
        this.movies = films;
      })
  }

  searchMovie(input: HTMLInputElement) {
    this.query = input.value;
    this.movieService.searchFilm(this.query)
    this.searchSub = this.movieService.getSearch()
      .subscribe((films: searchedFilm[]) => {
        this.movies = films;
      })
  }

  saveFilm(movie:searchedFilm){
    this.movieService.addFilm(movie)
  }
}
