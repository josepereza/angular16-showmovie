import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'showmovie';
  scrolling: boolean;
 
  prevScrollpos = 0;
  altura: number = 0;
  constructor(@Inject(DOCUMENT) private document: Document) {
    this.scrolling = false;
  }

  @HostListener('document:scroll', ['$event']) onScrollEvent($event: any) {
    var currentScrollPos = window.scrollY;
    // console.log($event['Window']);
    console.log('scrolling');

   
    /* if (this.prevScrollpos > currentScrollPos) {
      console.log('arriba');
      this.scrolling = false;
    } else {
      console.log('abajo');
      this.scrolling = true;
    }
    this.prevScrollpos = currentScrollPos;
   */

    if (this.document.documentElement.scrollTop != 0){
      this.scrolling=true;
    }

    if (this.document.documentElement.scrollTop == 0){
      this.scrolling=false;
    }
  
   
  }


  movieName = new FormControl('');
}
