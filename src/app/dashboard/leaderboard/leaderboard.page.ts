import { Component, OnInit } from '@angular/core';
import { Leaderboard } from './leaderboard.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.page.html',
  styleUrls: ['./leaderboard.page.scss'],
})
export class LeaderboardPage implements OnInit {
  usersInfo=[];

  //dummy data
  public players = [
        // {
        //     // "rank": "1",
        //     "name": "Luqman",
        //     "points": "100"
        // },
        // {
        //   // "rank": "2",
        //   "name": "Hakim",
        //   "points": "50"
        // },
    {
      rank: 0,
      name: "",
      points: 0
    }
  ]
  

  tableStyle = 'bootstrap';

  constructor(private firestore: AngularFirestore) { 
    this.firestore
      .collection("users-profile")
      .get()
      .subscribe((ss) => {
        ss.docs.forEach((doc) => {
         this.usersInfo.push(doc.data());
        });
        console.log(this.usersInfo);
      });

      //rank 
      // for(let i = 0; i < this.usersInfo.length; i++){
      //   this.players[i].rank.push(this.usersInfo[i].updated_at);
      // }
  }

  ngOnInit() {}
}
