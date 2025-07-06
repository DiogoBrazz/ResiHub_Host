import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // CommonModule já inclui o DatePipe
import { ActivatedRoute, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

// Models
import { Apartamento } from '../../../models/apartamento';
import { ContratoModule as Contrato } from '../../../models/contrato/contrato.module';

// Services
import { ApartamentoService } from '../../../services/apartamento.service';
import { ContratoService } from '../../../services/contrato.service';

// Interface para um dia no calendário
interface CalendarDay {
  date: Date;
  dayOfMonth: number;
  isCurrentMonth: boolean;
  isOccupied: boolean;
  isToday: boolean;
}

@Component({
  selector: 'app-apartamentoinfo',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './apartamentoinfo.component.html',
  styleUrls: ['./apartamentoinfo.component.scss']
})
export class ApartamentoinfoComponent implements OnInit {

  route = inject(ActivatedRoute);
  apartamentoService = inject(ApartamentoService);
  contratoService = inject(ContratoService);

  apartamento: Apartamento = new Apartamento();
  listaContratos: Contrato[] = [];

  // Propriedades para o calendário
  public currentDate: Date = new Date();
  public calendarDays: CalendarDay[] = [];
  public readonly monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
  public readonly weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];


  ngOnInit(): void {
    const aparnumString = this.route.snapshot.paramMap.get('id');
    if (aparnumString) {
      const aparnum = parseInt(aparnumString, 10);
      this.findApartamentoById(aparnum);
      // A geração do calendário agora depende dos contratos
      this.findContratosAndGenerateCalendar(aparnum);
    }
  }

  findApartamentoById(aparnum: number): void {
    this.apartamentoService.findByAparNum(aparnum).subscribe({
      next: (ap) => this.apartamento = ap,
      error: (erro) => {
        if(erro.status != 403){
        console.error(erro);
        Swal.fire('Erro', 'Não foi possível carregar os dados do apartamento.', 'error');
      }}
    });
  }

  findContratosAndGenerateCalendar(aparnum: number): void {
    this.contratoService.listAll().subscribe({
      next: (contratos) => {
        this.listaContratos = contratos.filter(c => c.ap?.aparnum === aparnum);
        // Agora que temos os contratos, geramos o calendário
        this.generateCalendar(this.currentDate);
      },
      error: (erro) => {
        if(erro.status != 403){
        console.error(erro);
        Swal.fire('Aviso', 'Não foi possível carregar o histórico de ocupação.', 'warning');
      }}
    });
  }

  generateCalendar(date: Date): void {
    this.calendarDays = [];
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const startDayOfWeek = firstDayOfMonth.getDay(); // 0=Dom, 1=Seg, ...

    // Preenche os dias do mês anterior para completar a primeira semana
    for (let i = 0; i < startDayOfWeek; i++) {
      const day = new Date(year, month, i - startDayOfWeek + 1);
      this.calendarDays.push({ date: day, dayOfMonth: day.getDate(), isCurrentMonth: false, isOccupied: false, isToday: false });
    }

    // Preenche os dias do mês atual
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      const day = new Date(year, month, i);
      const isOccupied = this.isDateOccupied(day);
      const isToday = this.isSameDay(day, new Date());
      this.calendarDays.push({ date: day, dayOfMonth: i, isCurrentMonth: true, isOccupied, isToday });
    }
    
    // Preenche com os dias do próximo mês para completar a grade
     const lastDayOfWeek = lastDayOfMonth.getDay();
     const remainingDays = 6 - lastDayOfWeek;
     for (let i = 1; i <= remainingDays; i++) {
       const day = new Date(year, month + 1, i);
       this.calendarDays.push({ date: day, dayOfMonth: day.getDate(), isCurrentMonth: false, isOccupied: false, isToday: false });
     }
  }

  isDateOccupied(date: Date): boolean {
    // Normaliza a data para ignorar a hora
    const checkDate = new Date(date.setHours(0, 0, 0, 0));

    for (const contrato of this.listaContratos) {
      const startDate = new Date(new Date(contrato.entrada).setHours(0,0,0,0));
      const endDate = new Date(new Date(contrato.saida).setHours(0,0,0,0));
      if (checkDate >= startDate && checkDate <= endDate) {
        return true;
      }
    }
    return false;
  }

  isSameDay(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
  }

  previousMonth(): void {
    this.currentDate = new Date(this.currentDate.setMonth(this.currentDate.getMonth() - 1));
    this.generateCalendar(this.currentDate);
  }

  nextMonth(): void {
    this.currentDate = new Date(this.currentDate.setMonth(this.currentDate.getMonth() + 1));
    this.generateCalendar(this.currentDate);
  }
}
