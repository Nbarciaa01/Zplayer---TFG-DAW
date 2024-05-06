
import { Component } from '@angular/core';

@Component({
    selector: 'zplayer-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
})
export class HomeComponent {
  contenido: string = '';

  ajustarAltura() {
    const textarea = document.getElementById('mensaje');
    textarea!.style.height = 'auto'; // Restablecer la altura a 'auto' para evitar el desbordamiento
    textarea!.style.height = textarea!.scrollHeight + 'px'; // Ajustar la altura según el contenido
  }

}
