import {Directive, ElementRef, HostBinding, HostListener, Renderer2} from '@angular/core';

@Directive({
  selector: '[appTableRow]'
})

export class TableRowDirective {
  @HostBinding('class.row_selected') isSelected = false;

  constructor(private renderer: Renderer2, private el: ElementRef) {
  }
  @HostListener('mouseover') onMouseOver() {
    const siblings = this.el.nativeElement.parentNode.children;
    for ( const c of siblings){
      this.renderer.removeClass(c, 'row_selected');
    }
    this.isSelected = !this.isSelected;
  }
}
