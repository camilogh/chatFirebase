import { Injectable } from '@angular/core';
import { AngularFirestore,AngularFirestoreCollection } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';

import { Mensajes } from '../interfaces/chats.interface';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollection:AngularFirestoreCollection<Mensajes>

  public chats: Mensajes[]=[];

  public usuario :any = {};

  constructor(private afs:AngularFirestore,
              public auth: AngularFireAuth) { 
    this.auth.authState.subscribe(user=> {
      console.log(user);
      if (!user) return;
      
      this.usuario.nombre = user.displayName;
      this.usuario.uid = user.uid;
      this.usuario.foto = user.photoURL;
      
     
    })
  }

  login(proveedor:string) {
    if (proveedor==='google')
      this.auth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    else
      this.auth.auth.signInWithPopup(new auth.TwitterAuthProvider());
  }

  logout() {
    this.usuario= {};
    this.auth.auth.signOut();
  }


  cargarMensajes(){
    // los mensajes retornan en un orden x. Hay que ordenarlos según el momento de envío
    this.itemsCollection = this.afs.collection<Mensajes>('chats', ref=> 
                                    ref.orderBy('fecha','desc')
                                    .limit(10) 
                                  );
    return this.itemsCollection.valueChanges().pipe(
                                  map((msgs:Mensajes[])=>{
                                    //console.log(msgs);
                                    this.chats=[];
                                    for (let mensaje of msgs){
                                      this.chats.unshift(mensaje);
                                  }
                                  return this.chats;
                              }));
  }

  agregarMensaje( texto:string ){
      let mensaje:Mensajes ={
        nombre:this.usuario.nombre,
        mensaje:texto,
        fecha: new Date().getTime(),
        uid:this.usuario.uid
      }

      return this.itemsCollection.add(mensaje);
  }


}
