import {Component } from '@angular/core';

import { faHouse, faEnvelope, faUsers, faUser, faRightFromBracket, faUserPlus } from '@fortawesome/free-solid-svg-icons';


@Component({
    selector: 'Zplayer-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.css',
})
export class SidebarComponent {

  faHouse = faHouse;
  faEnvelope = faEnvelope;
  faUsers = faUsers;
  faUser = faUser;
  faRightFromBracket = faRightFromBracket;
  faUserPlus = faUserPlus;

}
