import {  Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Chart from 'chart.js/auto';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AngularFirestore } from '@angular/fire/firestore';

const days = [
  'Sun',
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat'
]

@Component({
  selector: 'app-chart',
  templateUrl: './chart.page.html',
  styleUrls: ['./chart.page.scss'],
})
export class ChartPage implements OnInit {
  public chartItem: any[] = [];
  public chartWeekData={};
  public chartDaily: any[] = [];
  updatePoints=[];
  convertedDate=[];
  convertedDay=[];
  colledtedDay={
    Sun:0,
    Mon:0,
    Tue:0,
    Wed:0,
    Thu:0,
    Fri:0,
    Sat:0
  };

  @ViewChild('barCanvas') private barCanvas: ElementRef;

  barChart: any;

  constructor(private route: Router,
    private firebaseService: FirebaseService,
    private firestore: AngularFirestore) {

  //retrieve data from firebase.
  this.firestore
    .collection("user_actions").doc('ab77defe-3508-4715-845c-8cb40eb0fb3f').collection('create')
    .get()
    .subscribe((ss) => {
      ss.docs.forEach((doc) => {
       this.chartDaily.push(doc.data());
      });
         for(let i = 0; i < this.chartDaily.length; i++){
          this.updatePoints.push(this.chartDaily[i].updated_at);
        }

        //convert string date into ISO date format
        for(let i = 0; i < this.updatePoints.length; i++){
          this.convertedDate.push(new Date(this.updatePoints[i]));
        }

        //get day
        for(let i = 0; i < this.convertedDate.length; i++){
          this.convertedDay.push(days[this.convertedDate[i].getDay()]);
        }

        //collect days from array
        for(let i = 0; i < this.convertedDay.length; i++){
          if(this.convertedDay[i] === 'Sun'){
            this.colledtedDay.Sun+=1;
          }
          if(this.convertedDay[i] === 'Mon'){
            this.colledtedDay.Mon+=1;
          }
          if(this.convertedDay[i] === 'Tue'){
            this.colledtedDay.Tue+=1;
          }
          if(this.convertedDay[i] === 'Wed'){
            this.colledtedDay.Wed+=1;
          }
          if(this.convertedDay[i] === 'Thu'){
            this.colledtedDay.Thu+=1;
          }
          if(this.convertedDay[i] === 'Fri'){
            this.colledtedDay.Fri+=1;
          }
          if(this.convertedDay[i] === 'Sat'){
            this.colledtedDay.Sat+=1;
          }
        }
        this.barChartMethod();
    });
  }

  ngOnInit() {}

  ngAfterViewInit() {}

  //chart code
  barChartMethod() {
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
        datasets: [{
          data: [
            this.colledtedDay.Sun,
            this.colledtedDay.Mon,
            this.colledtedDay.Tue,
            this.colledtedDay.Wed,
            this.colledtedDay.Thu,
            this.colledtedDay.Fri,
            this.colledtedDay.Sat,
            100,
            20
            ],
          backgroundColor: [
            'rgb(255,0,0,0.2)',
            'rgb(255,165,0,0.2)',
            'rgb(255,255,0,0.2)',
            'rgb(0,128,0,0.2)',
            'rgb(0,0,255,0.2)',
            'rgb(75,0,130,0.2)',
            'rgb(238,130,238,0.2)'
          ],
          borderColor: [
            'rgb(255,0,0,1)',
            'rgb(255,165,0,1)',
            'rgb(255,255,0,1)',
            'rgb(0,128,0,1)',
            'rgb(0,0,255,1)',
            'rgb(75,0,130,1)',
            'rgb(238,130,238,1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        plugins: {
          legend: {
              display: false,
          }
      },
        scales: {
          y: {
            beginAtZero: true
        }
        }
      }
    });
  }
}
