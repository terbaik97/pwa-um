import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { 
  } 

  getUserDetails() { 
      return localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null; 
  } 
   
  setDataInLocalStorage(variableName, data) { 
      localStorage.setItem(variableName, data); 
  } 

  getToken() { 
      return localStorage.getItem('jwt'); 
  } 
  getUserEmail() { 
    return localStorage.getItem('email'); 
  } 
  getUserNickname() { 
    return localStorage.getItem('nickname'); 
  } 

  clearStorage() { 
      localStorage.clear(); 
  } 
}
