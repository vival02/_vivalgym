import { Component, ElementRef, HostListener, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { takeWhile, tap } from 'rxjs/operators';


@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent {
   @Input()serieSvolte: number = 0;
   @Input() diameterSpinner:number=100;
  tempoRecupero: number = 0;
  @Input() serieRichieste: string = '';
  selected = 'option1'
  prova = 1
  max = 1;
  current = 0;
  private timerSubscription: Subscription;
  startBol: boolean = false
  start(current: number, tempoRecupero: number) {
    this.current = 0
    const interval$ = interval(100);
    console.log(interval$)
    console.log("current " + this.current)
    
    this.tempoRecupero = tempoRecupero
    console.log(this.timerSubscription)
    this.timerSubscription = interval$
      .pipe(
        takeWhile(() => !this.isFinished()),
        tap(() => this.current += 0.1)
      )
      .subscribe();
    this.current = 0

  }
  calculateProgress(): number {

    return (100 - (this.current / this.tempoRecupero) * 100)
  }

  calcuateCountodown(): number {

    return (this.tempoRecupero - (Math.floor(((this.current / this.tempoRecupero) * 100) * this.tempoRecupero / 100)) || 0)
  }

  get determinate(): boolean {
    // You can adjust the logic here based on your requirements
    return true;
  }
  // finish timer
  finish() {
    this.current = this.tempoRecupero;
    this.timerSubscription.unsubscribe();
  }
  ngOnInit(): void {
    this.updateSpinnerDiameter();
    this.addResizeListener();
    this.current = 0;
    while (this.prova < 100000) {
      this.prova++
    }
  }
  // reset timer
  reset() {
    this.current = 0;
  }

  // Getters to prevent NaN errors

  get maxVal() {
    return isNaN(this.tempoRecupero) || this.tempoRecupero < 0.1 ? 0.1 : this.tempoRecupero;
  }

  get currentVal() {
    return this.current
    // isNaN(this.current) || this.current < 0 ? 0 : this.current;
  }

  isFinished() {

    return this.currentVal >= this.tempoRecupero;
  }
  private minWidth = 50; // Diametro minimo desiderato
  private maxWidth = 200; // Diametro massimo desiderato
  private newDiameter = 100;
  constructor(private el: ElementRef, private renderer: Renderer2) { }



  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.updateSpinnerDiameter();
  }

  private updateSpinnerDiameter(): void {
    const windowWidth = window.innerWidth;

    // Calcola il nuovo diametro in base alle dimensioni della finestra
    this.newDiameter = Math.floor(windowWidth * 0.1);

    // Limita il diametro tra minWidth e maxWidth
    this.newDiameter = Math.max(this.minWidth, Math.min(this.maxWidth, this.newDiameter));

    // Imposta il diametro mantenendo un rapporto 1:1 (larghezza e altezza)
    this.renderer.setStyle(this.el.nativeElement, '--spinner-diameter', `${this.newDiameter}px`);
  }
  private addResizeListener(): void {
    this.renderer.listen('window', 'resize', (event) => {
      // Chiamato quando la finestra viene ridimensionata
      this.updateSpinnerDiameter();
    });
  }
}
