import { Directive, Renderer2 ,Input, ViewContainerRef, ElementRef, } from '@angular/core';

@Directive({
  selector: '[appUpdateClass]'
})
export class UpdateClassDirective {
 

  constructor(private renderer: Renderer2, private el: ElementRef) { 

      this.renderer.addClass(this.el.nativeElement, "hide0rShow")

    
    
  }

}
