import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { savedfilm } from '../models/savedfilm.model';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit, OnDestroy{
  private moviesSub!: Subscription;

  movies:savedfilm[]=[];

  constructor(private movieService:MoviesService) { }


  ngOnDestroy() {
    this.moviesSub.unsubscribe()
  }

  ngOnInit(): void {
    this.movieService.getFilms()
    this.moviesSub = this.movieService.getFilmsListener()
    .subscribe((films:savedfilm[])=>{
      this.movies=films
    })
  }

  deleteFilm(film:savedfilm){
    this.movieService.deleteFilm(film._id)
  }


}
