import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{

  title = 'Recipe Book';
  loadedFeature = 'recipe';

  ngOnInit()  {
    firebase.initializeApp({
      apiKey: 'AIzaSyBEUqIsYopRrEZIydPI9AP22I28M_Mb2m8',
      authDomain: 'angular-recipe-book-c29d7.firebaseapp.com'
    });
  }

  onNavigate(feature: string)  {
    this.loadedFeature = feature;
  }


}
