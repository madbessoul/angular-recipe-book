import { Component, OnInit } from '@angular/core';
import {DataStorageService} from '../shared/data-storage.service';
import {AuthService} from '../auth/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent implements OnInit {

  brandTitle = 'Recipe book';
  recipes: any;


  constructor(private dataStorage: DataStorageService,
              private authService: AuthService) { }

  ngOnInit() {
  }

  onLogout()  {
    this.authService.logout();
  }

  onSaveData()  {
    this.dataStorage.saveRecipes()
      .subscribe();
  }

  onFetchData() {
    this.dataStorage.fetchData();
  }
}
