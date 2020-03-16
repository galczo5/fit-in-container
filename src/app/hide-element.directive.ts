import {Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {FitContainerDirective} from './fit-container.directive';

@Directive({
  selector: '[appHideElement]'
})
export class HideElementDirective implements OnInit, OnDestroy {

  @Input('appHideElement')
  level: number;

  private readonly nativeElement: HTMLElement;

  constructor(elementRef: ElementRef,
              private readonly renderer: Renderer2,
              private readonly parent: FitContainerDirective) {
    this.nativeElement = elementRef.nativeElement;
  }

  ngOnInit(): void {
    this.renderer.addClass(this.nativeElement, 'hide-' + this.level);
  }

  ngOnDestroy(): void {
    this.parent.childDestroyed();
  }

}
