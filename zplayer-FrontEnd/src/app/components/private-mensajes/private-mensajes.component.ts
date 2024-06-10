import {  AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from '../../services/rest.service';
import { Location } from '@angular/common';
import { User } from '../../infraestructure/models/user';

@Component({
    selector: 'app-private-mensajes',
    templateUrl: './private-mensajes.component.html',
    styleUrl: './private-mensajes.component.css',
})
export class PrivateMensajesComponent implements AfterViewInit, OnInit {
  @ViewChild('scrollableMessages') scrollableMessages!: ElementRef;

  receiver_id: string | number = 0;
  sender_id: string | number = 0;
  contenido: string = "";

  mensajes: any = [];

  nombreReceiver:string = ""
  logoReceiver:string = ""
  logoSender:string = ""
  usernameReceiver:string = ""

  constructor(private route: Router, private restSvc: RestService,private location:Location) {}

  ngAfterViewInit() {
    this.scrollToBottom(); // Desplaza al fondo al principio

    // Observador de mutaciones para detectar cambios en el contenido
    const observer = new MutationObserver(() => {
      this.scrollToBottom(); // Desplaza al fondo cuando se agrega nuevo contenido
    });

    // Observa cambios en el contenedor de scroll
    observer.observe(this.scrollableMessages.nativeElement, {
      childList: true, // Observa cambios en la lista de hijos
      subtree: true // Observa cambios en todos los nodos hijos
    });
  }

  scrollToBottom(): void {
    if (this.scrollableMessages) {
      const container = this.scrollableMessages.nativeElement;
      container.scrollTop = container.scrollHeight;
    }
  }
  ngOnInit(): void {

    const state: any = this.location.getState()

    if (state) {
      this.sender_id = state.sender_id;
      this.receiver_id = state.receiver_id;
    } else {
      // Manejo de error o redirección si los datos no están disponibles
      console.error('No se pasaron los IDs de usuario');
    }
    this.recuperarDatosUsuarios()
    this.recuperarMds()

  }

  enviarMd(event:any){
    if (event.key === "Enter") {

      if(this.contenido !== ""){
        this.restSvc.postMd(this.sender_id,this.receiver_id, this.contenido)

        setTimeout(() => {
          this.recuperarMds()
        }, 100);
      }
      this.contenido=""
    }
  }

  async recuperarMds(){
    this.mensajes = await this.restSvc.getMds(this.sender_id, this.receiver_id)
  }

  ajustarAltura() {
    const md = document.getElementById('md');
    md!.style.height = 'auto'; // Restablecer la altura a 'auto' para evitar el desbordamiento
    md!.style.height = md!.scrollHeight + 'px'; // Ajustar la altura según el contenido
  }

  async recuperarDatosUsuarios(){

    let usuarioReceiver: User = await this.restSvc.getDatosUser(this.receiver_id)
    let usuarioSender: User = await this.restSvc.getDatosUser(this.sender_id)

    this.nombreReceiver = usuarioReceiver.realname
    this.logoReceiver = usuarioReceiver.logo
    this.usernameReceiver = usuarioReceiver.username
    this.logoSender = usuarioSender.logo



  }

   devolverLogo(logo: string){
    return this.restSvc.getProfilePictureUrl(logo);
  }

  viewUserProfile(userId: string|number): void {

      this.route.navigate(['../perfil/user', userId]);
  }

 }
