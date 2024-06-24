import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appInputBorderHighlight]'
})
export class InputBorderHighlightDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('focus') onFocus() {
    this.setBorder('3px solid red');
  }

  @HostListener('blur') onBlur() {
    this.setBorder('1px solid #ccc');
  }

  private setBorder(border: string) {
    this.renderer.setStyle(this.el.nativeElement, 'border', border);
  }
}
