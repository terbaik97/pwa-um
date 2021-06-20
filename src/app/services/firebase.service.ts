import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs'; 
import { map } from 'rxjs/operators';

const badgeChosen = { 
  borderChosen1: '', 
  borderChosen2: '', 
  borderChosen3:'', 
  borderDisplayChosen: '' ,
  usableBorder: '',
  usableBorder2:'',
  usableBadge1:'', 
  usableBadge2: '', 
  usableBadge3:'', 
  usableBadge4:'',
  usableBadge5:'',
  usableBadge6:'',
  usableBadge7:'',
  usableBadge8:'',
 };

@Injectable({
  providedIn: 'root'
})

export class FirebaseService {
  chartPoints = [];
  collectionName = 'Current-Badge';
  collectionClaimed = 'claim-badges';
  collectionProfile = 'users-profile';
  collectionUserAction = 'user_actions';
  constructor(
    private firestore: AngularFirestore,
    private _authService:AuthService,) { }

  create_user(record: any , totalBadges) {
     this.firestore.collection('users-profile').doc(record).set(
      {
        id: record,
        name: this._authService.getUserNickname(),
        totalBadges: totalBadges ? totalBadges : 0,
        totalPoints: 100,
       
      });
       this.firestore.collection('claim-badges').doc(record).set(
        {
          claimedContBadge1:
          true,
          claimedContBadge2:
          true,
          claimedContBadge3:
          true,
          claimedContBadge4:
          true,
          claimedLoginBadge1:
          true,
          claimedLoginBadge2:
          true,
          claimedLoginBadge3:
          true,
          claimedLoginBadge4:
          true
         
        });
  }

  update_user(recordID: any , record) {
    console.log(recordID);
    console.log(record)
    // return this.firestore.collection(this.collectionName).snapshotChanges();
    this.firestore.doc(this.collectionProfile + '/' + recordID).update(record);
  }

  read_user(){
    return this.firestore.collection(this.collectionProfile).snapshotChanges();
  }

  create_current_badge(){
      return  this.firestore
          .collection(this.collectionName).doc('ab77defe-3508-4715-845c-8cb40eb0fb3f')
          .set(badgeChosen)
          // .then(response => { console.log(response) }, error => reject(error));
  }

  read_current_badge() {
    return this.firestore.collection(this.collectionName).snapshotChanges();
  }

  update_current_badge(recordID, record) {
    this.firestore.doc(this.collectionName + '/' + recordID).update(record);
  }

  update_current_badge2(recordID, record) {
    this.firestore.doc(this.collectionName + '/' + recordID).update(record);
  }
  // delete_student(record_id) {
  //   this.firestore.doc(this.collectionName + '/' + record_id).delete();
  // }

  update_current_border(recordID, record) {
    this.firestore.doc(this.collectionName + '/' + recordID).update(record);
  }

  read_claimed_badge() {
    return this.firestore.collection(this.collectionClaimed).snapshotChanges();
  }

  update_claimed_badge(recordID, record){
    console.log(record);
    this.firestore.doc(this.collectionClaimed + '/' + recordID).update(record);
  }

  //usable badge
  update_usable_badge(recordID, record){
    console.log(record);
    this.firestore.doc('Current-Badge' + '/' + recordID).update(record);
  }

  // create user_actions
  create_user_actions(record: any , user_actions: any) {
    console.log(record);
    console.log(user_actions.data);
    for ( var i = 0 ; i < user_actions.data.length; i++ ){
      this.firestore.collection('user_actions').doc(record).collection('create').doc(user_actions.data[i]["id"]).set(
        {
          
          created_at: user_actions.data[i]["created_at"],
          poi_id: user_actions.data[i]["poi_id"],
          status: user_actions.data[i]["status"],
          updated_at: user_actions.data[i]["updated_at"],
          user_action:  user_actions.data[i]["action_user"] ,
          user_id:  user_actions.data[i]["user_id"]
          
        },{ merge: true });
    } 
 }

 update_user_actions(record: any , user_actions: any) {
  console.log(record);
  console.log(user_actions.data);
  for ( var i = 0 ; i < user_actions.data.length; i++ ){
    this.firestore.collection('user_actions').doc(record).collection('update').doc(user_actions.data[i]["id"]).set(
      {
        
        created_at: user_actions.data[i]["created_at"],
        poi_id: user_actions.data[i]["poi_id"],
        status: user_actions.data[i]["status"],
        updated_at: user_actions.data[i]["updated_at"],
        user_action:  user_actions.data[i]["action_user"] ,
        user_id:  user_actions.data[i]["user_id"]
        
      },{ merge: true });
    } 
  }

  read_user_actions(){
    return this.firestore.collection(this.collectionClaimed).snapshotChanges();
  }
  

}

