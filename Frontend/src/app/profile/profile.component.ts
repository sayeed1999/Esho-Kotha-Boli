import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewUser } from '../models/viewUser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  viewUser!: ViewUser;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // this params is the route parameters only! e.g. user/1, user/2, user/3
    // this.route.params.subscribe(data => {
    //   console.log(data)
    // })

    // Can access route resolver data with the ActivatedRoute service!
    this.route.data.subscribe((data: any) => {
      console.log('Checking route resolver data...');
      console.log(data);
      this.viewUser = data.routeResolver;
    })
  }

}
