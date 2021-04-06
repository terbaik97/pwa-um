import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form: FormGroup 
  constructor( 
    private _api : ApiService, 
    private _auth: AuthService, 
    private router: Router, 
    public fb: FormBuilder 
  ) { } 
 
  ngOnInit(): void { 
    this.form = this.fb.group({ 
      email: ['', Validators.required], 
      password:['', Validators.required] 
    }); 
  } 
 
  login(){ 
    let b = this.form.value 
    console.log(b) 
    this._api.postTypeRequest('login', b).subscribe((res: any) => { 
      console.log(res.data.access_token) 
      if(res.data.access_token){ 
        
        this._auth.setDataInLocalStorage('jwt', res.data.access_token.jwt) 
        this.router.navigate(['profile']) 
      } 
    }, err => { 
      console.log(err) 
    }); 
  } 
}
