import { Component } from '@angular/core';
import { ChatService } from '../../services/chat.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent{

  constructor(public chatserv:ChatService) { }

  data:any[];

  ingresar(proveedor:string){
    console.log(proveedor);

    this.chatserv.login(proveedor);
  }

}
