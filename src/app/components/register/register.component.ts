import { Component, OnInit } from '@angular/core';
import { ValidateService } from "../../../services/validate.service";
import { AuthService } from "../../../services/auth.service";

import { FlashMessagesService } from "angular2-flash-messages";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;
  constructor(private validateService:ValidateService,private falshMessages:FlashMessagesService,private authService:AuthService) { }

  ngOnInit() {
  }
  onRegisterSubmit(){

    const user =  {
      name:this.name,
      username:this.username,
      email:this.email,
      password:this.password
    }
    if (!this.validateService.validateRegister(user)) {
      this.falshMessages.show("Please fill in all Fileds",{cssClass:'alert-danger',timeout:3000});
      return false
    }
    if (!this.validateService.validateEmail(user.email)) {
      this.falshMessages.show("Please enter an valid email",{cssClass:'alert-danger',timeout:3000});
      return false
    }
  }
}
