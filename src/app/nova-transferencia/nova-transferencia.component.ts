import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Transferencia } from '../models/transferencia.model';
import { TransferenciaService } from '../services/transferencia.service';

@Component({
  selector: 'app-nova-transferencia',
  templateUrl: './nova-transferencia.component.html',
  styleUrls: ['./nova-transferencia.component.scss'],
})
export class NovaTransferenciaComponent {
  @Output() aoTransferir = new EventEmitter<any>();

  valor: number;
  destino: number;

  constructor(private service: TransferenciaService, private router: Router) {}

  transferir() {
    console.log('Nova transferĂȘncia foi solicitada!');

    const valorEmitir: Transferencia = {
      valor: this.valor,
      destino: this.destino,
    };

    this.service.adicionar(valorEmitir).subscribe({
      next: (resultado) => {
        console.info(resultado);
        this.limparCampos();
        this.router.navigateByUrl('extrato');
      },
      error: (e) => console.error(e),
      complete: () => console.info('Completo'),
    });
  }

  limparCampos() {
    this.valor = 0;
    this.destino = 0;
  }
}
