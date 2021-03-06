import { Component, OnInit } from '@angular/core';
import { ValidateService } from "../../../services/validate.service";
import { AuthService } from "../../../services/auth.service";
import { FlashMessagesService } from "angular2-flash-messages";
import {Router} from "@angular/router"

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
  constructor(
    private validateService:ValidateService,
    private falshMessages:FlashMessagesService,
    private authService:AuthService,
    private router:Router
  ) { }

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
    this.authService.registerUser(user).subscribe(data =>{
      if (data.success) {
        //this.falshMessages.show("You have successfully signed up",{cssClass:'alert-success'});
        this.router.navigate(['/login'])
      }else{
        //this.falshMessages.show("Please try again later ",{cssClass:'alert-warning',timeout:3000});
        this.router.navigate(['/register'])

      }
    });
  }
}
