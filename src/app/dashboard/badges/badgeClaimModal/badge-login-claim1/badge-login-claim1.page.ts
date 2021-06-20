import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-badge-login-claim1',
  templateUrl: './badge-login-claim1.page.html',
  styleUrls: ['./badge-login-claim1.page.scss'],
})
export class BadgeLoginClaim1Page implements OnInit {
  //usable
  public usableBadge: any;
  //
  public claimedLoginBadge1: any;
  constructor(private modalCtr: ModalController,
    private firebaseService: FirebaseService,
    private _authService:AuthService) { }

  ngOnInit() {
  }

  async close() {
    const closeModal: string = "Modal Closed";
    await this.modalCtr.dismiss(closeModal);
  }

  buttonClaim(){
    this.claimedLoginBadge1=true;
    // this.update(this._authService.getUserId(), this.claimedLoginBadge1);
    //usable badge
    this.usableBadge=true;
    this.updateUsable('ab77defe-3508-4715-845c-8cb40eb0fb3f', this.usableBadge)
    this.close();
  }

  update(id, record) {
    let recordBorder = {};
    recordBorder['claimedLoginBadge1'] = record;
    this.firebaseService.update_claimed_badge(id, recordBorder);
  }

  //usable
  updateUsable(id, record){
    let usableBadge = {};
    usableBadge['usableBadge1'] = record;
    this.firebaseService.update_usable_badge(id, usableBadge);
  }
}