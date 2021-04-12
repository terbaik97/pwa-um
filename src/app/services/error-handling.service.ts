import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {

  constructor() { }

  getErrorMessage(err){
    switch (err.status) {
      case 401:      //login
          return "Unauthorized";
          break;
      case 400:     //forbidden
          return "Bad Request";
          break;
      case 422:     //forbidden
          return "Invalid Password or Email";
          break;
  }
  }
}
