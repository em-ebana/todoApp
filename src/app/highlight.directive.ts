import { Directive, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective implements OnInit{

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  private highlightDays(days: string[]){
    const dayElements = document.querySelectorAll('mat-calendar .mat-calendar-table .mat-calendar-body-cell');

    Array.from(dayElements).forEach(element =>{
      const matchingDay = days.find(d => d === element.getAttribute('aria-label')) !== undefined;

      if(matchingDay){
        this.renderer.addClass(element, 'available');
        this.renderer.setAttribute(element, 'title', 'Event 1');
       } else{
        this.renderer.removeClass(element, 'available');
        this.renderer.removeAttribute(element, 'title')
       }
    })
  }

  ngOnInit(){

  }

}
