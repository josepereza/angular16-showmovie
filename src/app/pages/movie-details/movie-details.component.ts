import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MovieApiServiceService } from 'src/app/service/movie-api-service.service';
import { Title,Meta } from '@angular/platform-browser';
interface Video {
  type: string;
  key: string;
}
@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent {
urlDetails='https://api.themoviedb.org/3/movie/930094?api_key=b2b2b544b98945b0423554da4ff5209b'
movie:any;
trailers: Video[] = [];
constructor(
  private route: ActivatedRoute,
  private router: Router, 
  private service:MovieApiServiceService,
  private title:Title,
  private meta:Meta
  ) {}

  getMovieDetailResult:any;
  getMovieVideoResult:any;
  getMovieCastResult:any;

  ngOnInit() {
    const getParamId = this.route.snapshot.paramMap.get('id');
  
    this.getMovie(getParamId);
    this.getVideo(getParamId);
    this.getMovieCast(getParamId);

  
  }
  getMovie(id:any){
    this.service.getMovieDetails(id).subscribe(async(result)=>{
        console.log(result,'getmoviedetails#');
        this.getMovieDetailResult = await result;

        // updatetags
        this.title.setTitle(`${this.getMovieDetailResult.original_title} | ${this.getMovieDetailResult.tagline}`);
        this.meta.updateTag({name:'title',content:this.getMovieDetailResult.original_title});
        this.meta.updateTag({name:'description',content:this.getMovieDetailResult.overview});
     
        // facebook
        this.meta.updateTag({property:'og:type',content:"website"});
        this.meta.updateTag({property:'og:url',content:``});
        this.meta.updateTag({property:'og:title',content:this.getMovieDetailResult.original_title});
        this.meta.updateTag({property:'og:description',content:this.getMovieDetailResult.overview});
        this.meta.updateTag({property:'og:image',content:`https://image.tmdb.org/t/p/original/${this.getMovieDetailResult.backdrop_path}`});

    });
  }

  getVideo(id:any)
  {
    this.service.getMovieVideo(id).subscribe((result)=>{
        console.log(result,'getMovieVideo#');
        result.results.forEach((element:any) => {
            if(element.type=="Trailer")
            {
              this.getMovieVideoResult = element.key;
            }
        });

    });
  }

  getMovieCast(id:any)
  {
    this.service.getMovieCast(id).subscribe((result)=>{
      console.log(result,'movieCast#');
      this.getMovieCastResult = result.cast;
    });
  }

}
