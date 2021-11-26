import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { savedfilm } from './models/savedfilm.model';
import { searchedFilm } from './models/searchedfilm.model';
import { map, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private apiKey=`58dd1adf`;

  private savedFilms: savedfilm[]=[];

  private searchedFilms:searchedFilm[]=[];

  private fetchSearch = new Subject<searchedFilm[]>();

  private fetchSaved = new Subject<savedfilm[]>();


  getFilms(){
    this.http.get<{message:string, films: savedfilm[]}>("http://localhost:3000/api/films")
    .subscribe(responseData=>{
      console.log(responseData)
      this.savedFilms=responseData.films;
      this.fetchSaved.next([...this.savedFilms])
    })
  }

  getFilmsListener(){
    return this.fetchSaved.asObservable()
  }


  searchFilm(query:string){
    this.http.get<{Search:[],totalResults:string,response:string}>(`https://omdbapi.com/?apikey=${this.apiKey}&s=${query}`)
    .pipe(map(
      responseData=>{
        return responseData.Search.map(
          (film: { Poster: string; Title: string; Year: string; }) =>{
            return{
              poster: film.Poster,
              title: film.Title,
              year:film.Year
            };
          }
        )

      })
)
    .subscribe(transformedData=>{
      this.searchedFilms=transformedData;
      this.fetchSearch.next([...this.searchedFilms])
    })
  }

  getSearch(){
    return this.fetchSearch.asObservable();
  }

  // saveFilm(movie:searchedFilm){
  //   let newFilm:savedfilm={_poster:movie.poster, title:movie.title, year:movie.year, rating:"-", comment:"-" }
  //   this.savedFilms.push(newFilm)
  // }

  addFilm(movie:searchedFilm){
    let newFilm:savedfilm={_id:"",poster:movie.poster, title:movie.title, year:movie.year, rating:"-", comment:"-" }
    this.http.post<{message:string,id:string}>("http://localhost:3000/api/films", newFilm)
    .subscribe(responseData =>{
      const id = responseData.id;
      newFilm._id= id;
      this.savedFilms.push(newFilm);
      this.fetchSaved.next([...this.savedFilms])
      this.router.navigate([`edit/${id}`])
    })
  }


  deleteFilm(id:string){
    this.http.delete("http://localhost:3000/api/films/"+id)
    .subscribe(()=>{
      const updatedFilms = this.savedFilms.filter(f=> f._id!=id)
      this.savedFilms=updatedFilms;
      this.fetchSaved.next([...this.savedFilms])
    })
  }

  updateFilm(route:string,rating:string,comment:string){
    this.http.put("http://localhost:3000/api/films/"+route,{rating,comment})
    .subscribe(()=>{
      this.router.navigate([`/`])

    })
  }












  constructor(private http:HttpClient, private router:Router) { }
}
