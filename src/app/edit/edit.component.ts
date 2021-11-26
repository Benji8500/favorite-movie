import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../movies.service';

interface Score {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})



export class EditComponent implements OnInit {

  selected = 'A+';
  scores: Score[] = [
    { value: 'a+', viewValue: 'A+' },
    { value: 'a', viewValue: 'A' },
    { value: 'b+', viewValue: 'B+' },
    { value: 'b', viewValue: 'B' },
    { value: 'c', viewValue: 'C+' },
    { value: 'd', viewValue: 'D' },
    { value: 'f', viewValue: 'F' },

  ];

  constructor(private moviesService: MoviesService, public route: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

  updateMovie(form: NgForm) {
    let route=""
    this.route.params.subscribe(p=>{
      route=p['id']
      }
    )
    console.log(route)
    const rating = this.selected;
    const comment: string = form.value.comment;
    this.moviesService.updateFilm(route,rating, comment)
  }

}
