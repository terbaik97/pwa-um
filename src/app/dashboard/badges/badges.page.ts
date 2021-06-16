import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BadgeContributionClaim1Page } from './badgeClaimModal/badge-contribution-claim1/badge-contribution-claim1.page';
import { BadgeContributionClaim2Page } from './badgeClaimModal/badge-contribution-claim2/badge-contribution-claim2.page';
import { BadgeContributionClaim3Page } from './badgeClaimModal/badge-contribution-claim3/badge-contribution-claim3.page';
import { BadgeContributionClaim4Page } from './badgeClaimModal/badge-contribution-claim4/badge-contribution-claim4.page';
import { BadgeLoginClaim1Page } from './badgeClaimModal/badge-login-claim1/badge-login-claim1.page';
import { BadgeLoginClaim2Page } from './badgeClaimModal/badge-login-claim2/badge-login-claim2.page';
import { BadgeLoginClaim3Page } from './badgeClaimModal/badge-login-claim3/badge-login-claim3.page';
import { BadgeLoginClaim4Page } from './badgeClaimModal/badge-login-claim4/badge-login-claim4.page';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ProfileService } from 'src/app/services/profile.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-badges',
  templateUrl: './badges.page.html',
  styleUrls: ['./badges.page.scss'],
})
export class BadgesPage implements OnInit {
  listClaimedBadges:any;
  buttonClaimedLogin1:any;
  buttonClaimedLogin2:any;
  buttonClaimedLogin3:any;
  buttonClaimedLogin4:any;
  buttonClaimedCont1:any;
  buttonClaimedCont2:any;
  buttonClaimedCont3:any;
  buttonClaimedCont4:any;
  countBadges = 0;
  recordBorder = {}
  constructor(public modalCtrl: ModalController,
    private firebaseService: FirebaseService,
    private _profileService:ProfileService,
    private _authService:AuthService
    ) {
    this.firebaseService.read_claimed_badge().subscribe(data => {
      this.listClaimedBadges = data.map(e => {
        return {
          id: e.payload.doc.id,
          claimedContBadge1: e.payload.doc.data()['claimedContBadge1'],
          claimedContBadge2: e.payload.doc.data()['claimedContBadge2'],
          claimedContBadge3: e.payload.doc.data()['claimedContBadge3'],
          claimedContBadge4: e.payload.doc.data()['claimedContBadge4'],
          claimedLoginBadge1: e.payload.doc.data()['claimedLoginBadge1'],
          claimedLoginBadge2: e.payload.doc.data()['claimedLoginBadge2'],
          claimedLoginBadge3: e.payload.doc.data()['claimedLoginBadge3'],
          claimedLoginBadge4: e.payload.doc.data()['claimedLoginBadge4'],
        };
      })
 
    });
  }

  ngOnInit() {
    // this._profileService.getUseractivityCreate().subscribe((res: any)=>
    // {
    //   console.log(res.data);
    //   this.firebaseService.create_user_actions(this._authService.getUserId(),res);
    //   if(res.data.length > 1 ){
    //     this.recordBorder['claimedLoginBadge1'] = false;
    //     this.firebaseService.update_claimed_badge(this._authService.getUserId(), this.recordBorder);
    //     this.buttonClaimedLogin1 = this.recordBorder['claimedLoginBadge1'];
    //     this.countBadges+=1;
    //     this.recordBorder['totalBadges'] = this.countBadges;
    //     this.firebaseService.update_user(this._authService.getUserId(),this.recordBorder);
        
    //   }
    //   else if(res.data.length > 7){
       
    //     this.recordBorder['claimedLoginBadge2'] = false;
    //     this.firebaseService.update_claimed_badge(this._authService.getUserId(), this.recordBorder);
    //     this.buttonClaimedLogin1 = this.recordBorder['claimedLoginBadge2'];
    //     this.countBadges+=1;
    //     this.recordBorder['totalBadges'] = this.countBadges;
    //     this.firebaseService.update_user(this._authService.getUserId(),this.recordBorder);
        
    //   }
    //   else if(res.data.length > 30){
    //     this.recordBorder['claimedLoginBadge3'] = false;
    //     this.firebaseService.update_claimed_badge(this._authService.getUserId(), this.recordBorder);
    //     this.buttonClaimedLogin1 = this.recordBorder['claimedLoginBadge3'];
    //     this.countBadges+=1;
    //     this.recordBorder['totalBadges'] = this.countBadges;
    //     this.firebaseService.update_user(this._authService.getUserId(),this.recordBorder);
    //   }
    //   else if(res.data.length > 90){
    //     this.recordBorder['claimedLoginBadge4'] = false;
    //     this.firebaseService.update_claimed_badge(this._authService.getUserId(), this.recordBorder);
    //     this.buttonClaimedLogin1 = this.recordBorder['claimedLoginBadge4'];
    //     this.countBadges+=1;
    //     this.recordBorder['totalBadges'] = this.countBadges;
    //     this.firebaseService.update_user(this._authService.getUserId(),this.recordBorder);
    //   }
    // });

  
    // this._profileService.getUseractivityUpdate().subscribe((res: any)=>
    // {
    //   console.log(res.data);
    //   this.firebaseService.update_user_actions(this._authService.getUserId(),res);
    //   if(res.data.length > 1)
    //   {
    //     this.recordBorder['claimedContBadge1'] = false;
    //     this.firebaseService.update_claimed_badge(this._authService.getUserId(), this.recordBorder);
    //     this.buttonClaimedLogin1 = this.recordBorder['claimedContBadge1'];
    //     this.countBadges+=1;
    //     this.recordBorder['totalBadges'] = this.countBadges;
    //     this.firebaseService.update_user(this._authService.getUserId(),this.recordBorder);
    //   }
    //   else if(res.data.length > 20)
    //   {
    //     this.recordBorder['claimedContBadge2'] = false;
    //     this.firebaseService.update_claimed_badge(this._authService.getUserId(), this.recordBorder);
    //     this.buttonClaimedLogin1 = this.recordBorder['claimedContBadge2'];
    //     this.countBadges+=1;
    //     this.recordBorder['totalBadges'] = this.countBadges;
    //     this.firebaseService.update_user(this._authService.getUserId(),this.recordBorder);
    //   }
    //   else if(res.data.length > 60)
    //   {
    //     this.recordBorder['claimedContBadge3'] = false;
    //     this.firebaseService.update_claimed_badge(this._authService.getUserId(), this.recordBorder);
    //     this.buttonClaimedLogin1 = this.recordBorder['claimedContBadge3'];
    //     this.countBadges+=1;
    //     this.recordBorder['totalBadges'] = this.countBadges;
    //     this.firebaseService.update_user(this._authService.getUserId(),this.recordBorder);
    //   }
    //   else if(res.data.length > 100)
    //   {
    //     this.recordBorder['claimedContBadge4'] = false;
    //     this.firebaseService.update_claimed_badge(this._authService.getUserId(), this.recordBorder);
    //     this.buttonClaimedLogin1 = this.recordBorder['claimedContBadge4'];
    //     this.countBadges+=1;
    //     this.recordBorder['totalBadges'] = this.countBadges;
    //     this.firebaseService.update_user(this._authService.getUserId(),this.recordBorder);
    //   }
      
    // });
  }

  async toClaimLoginModal1(){
    const modal = await this.modalCtrl.create({
      component: BadgeLoginClaim1Page,
    });

    return await modal.present();
  }

  async toClaimLoginModal2(){
    const modal = await this.modalCtrl.create({
      component: BadgeLoginClaim2Page,
    });

    return await modal.present();
  }

  async toClaimLoginModal3(){
    const modal = await this.modalCtrl.create({
      component: BadgeLoginClaim3Page,
    });

    return await modal.present();
  }

  async toClaimLoginModal4(){
    const modal = await this.modalCtrl.create({
      component: BadgeLoginClaim4Page,
    });

    return await modal.present();
  }

  async toClaimContModal1(){
    const modal = await this.modalCtrl.create({
      component: BadgeContributionClaim1Page,
    });

    return await modal.present();
  }

  async toClaimContModal2(){
    const modal = await this.modalCtrl.create({
      component: BadgeContributionClaim2Page,
    });

    return await modal.present();
  }

  async toClaimContModal3(){
    const modal = await this.modalCtrl.create({
      component: BadgeContributionClaim3Page,
    });

    return await modal.present();
  }

  async toClaimContModal4(){
    const modal = await this.modalCtrl.create({
      component: BadgeContributionClaim4Page,
    });

    return await modal.present();
  }
}