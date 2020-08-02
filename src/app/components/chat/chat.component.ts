import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Mensajes } from 'src/app/interfaces/chats.interface';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: [
  ]
})
export class ChatComponent implements OnInit  {

  mensaje :string='';
  elemento:any;

  constructor(public schat:ChatService) { 
    this.schat.cargarMensajes()
              .subscribe(()=>{
                setTimeout(() => {
                  this.elemento.scrollTop = this.elemento.scrollHeight;
                }, 20);
              });
  }

  ngOnInit(){
    this.elemento = document.getElementById('app-mensajes');
    
  }

  enviar_mensaje(){
    console.log(this.mensaje);

    if (this.mensaje.length === 0){
      return;
    }

    this.schat.agregarMensaje(this.mensaje)
              .then(()=>  this.mensaje='' )
              .catch((err)=>console.error('Error al enviar mensaje',err));
      
             

  }

}
