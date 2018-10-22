import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn: Observable<boolean>;
  constructor(private router: Router,
  private authService: AuthenticationService) {
  this.isLoggedIn = authService.isLoggedIn();
}
  ngOnInit() {
    
  }

}
