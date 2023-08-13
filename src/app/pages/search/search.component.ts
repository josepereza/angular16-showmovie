import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Title,Meta } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MovieApiServiceService } from 'src/app/service/movie-api-service.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  movieName:any='' 
  constructor(
    private service:MovieApiServiceService,
    private title:Title,private meta:Meta,
    private route:ActivatedRoute
    ) {
    this.title.setTitle('Search movies - showtime');
    this.meta.updateTag({name:'description',content:'search here movies like avatar,war etc'});
   }
  ngOnInit(): void {
    this.route.queryParams
    .subscribe(params => {
          this.movieName = params['movieName']||'';    
          console.log(this.movieName) 
          this.searchForm.setValue({movieName:this.movieName})
          this.submitForm()
});
     
      
  }
   searchResult:any;
   searchForm = new FormGroup({
     'movieName':new FormControl('')
   });
 
   submitForm()
   {
       console.log(this.searchForm.value,'searchform#');
       this.service.getSearchMovie(this.searchForm.value).subscribe((result)=>{
           console.log(result,'searchmovie##');
           this.searchResult = result.results;
       });
   }
 
}
