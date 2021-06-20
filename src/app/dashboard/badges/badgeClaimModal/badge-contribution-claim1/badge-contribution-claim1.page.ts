import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-badge-contribution-claim1',
  templateUrl: './badge-contribution-claim1.page.html',
  styleUrls: ['./badge-contribution-claim1.page.scss'],
})
export class BadgeContributionClaim1Page implements OnInit {
  public claimedContBadge1: any;
  public usableBadge: any;

  constructor(private modalCtr: ModalController,
    private firebaseService: FirebaseService) { }

  ngOnInit() {
  }

  async close() {
    const closeModal: string = "Modal Closed";
    await this.modalCtr.dismiss(closeModal);
  }

  buttonClaim(){
    this.claimedContBadge1=true;
    // this.update('ab77defe-3508-4715-845c-8cb40eb0fb3f', this.claimedContBadge1);
    //usable badge
    this.usableBadge=true;
    this.updateUsable('ab77defe-3508-4715-845c-8cb40eb0fb3f', this.usableBadge)
    //
    this.close();
  }

  update(id, record) {
    let recordBorder = {};
    recordBorder['claimedContBadge1'] = record;
    this.firebaseService.update_claimed_badge(id, recordBorder);
  }

  updateUsable(id, record){
    let usableBadge = {};
    usableBadge['usableBadge1'] = record;
    this.firebaseService.update_claimed_badge(id, usableBadge);
  }

}