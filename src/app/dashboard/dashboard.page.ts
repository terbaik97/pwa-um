import { Component, OnInit } from '@angular/core';
import {Router, RouterEvent} from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(private router:Router) {
  }

  ngOnInit() {
  }

}
