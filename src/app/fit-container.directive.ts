import {AfterViewInit, Directive, ElementRef, NgZone, OnDestroy, Renderer2} from '@angular/core';
import {animationFrameScheduler, interval, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

const CHECKING_TIME = 250;

@Directive({
  selector: '[appFitContainer]'
})
export class FitContainerDirective implements AfterViewInit, OnDestroy {

  private readonly nativeElement: HTMLElement;
  private currentHideLevel = 0;
  private lastOffsetWidth: number;
  private readonly maxHideLevel = 3;

  private destroy$: Subject<void> = new Subject<void>();
  private forcePrevLevel: boolean;

  constructor(elementRef: ElementRef,
              private readonly zone: NgZone,
              private readonly renderer: Renderer2) {
    this.nativeElement = elementRef.nativeElement;
  }

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {

      interval(CHECKING_TIME, animationFrameScheduler)
        .pipe(
          takeUntil(this.destroy$)
        )
        .subscribe(() => {
          const scroll = this.nativeElement.scrollWidth;
          const offset = this.nativeElement.offsetWidth;

          if (scroll > offset && this.currentHideLevel < this.maxHideLevel) {
            while (this.tryHide()) {
              this.lastOffsetWidth = offset;
            }
          } else if ((this.forcePrevLevel || offset > this.lastOffsetWidth) && this.currentHideLevel > 0) {
            this.showPrevLevel();
            this.forcePrevLevel = false;

            if (this.check()) {
              this.lastOffsetWidth = offset;
            }
          }
        });
    });
  }

  private check(): boolean {
    const scroll = this.nativeElement.scrollWidth;
    const offset = this.nativeElement.offsetWidth;

    if (scroll > offset) {
      this.hideNextLevel();
      return false;
    }

    return true;
  }

  tryHide(): boolean {
    const scroll = this.nativeElement.scrollWidth;
    const offset = this.nativeElement.offsetWidth;

    if (scroll > offset && this.currentHideLevel < this.maxHideLevel) {
      this.hideNextLevel();
      return true;
    }
    return false;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  childDestroyed(): void {
    this.forcePrevLevel = true;
  }

  showPrevLevel(): void {
    this.changeLevel(-1);
  }

  hideNextLevel(): void {
    this.changeLevel(1);
  }

  private changeLevel(offset: 1 | -1): void {
    this.renderer.removeClass(this.nativeElement, 'hide-level-' + this.currentHideLevel);
    this.currentHideLevel = Math.max(Math.min(this.currentHideLevel + offset, this.maxHideLevel), 0);
    this.renderer.addClass(this.nativeElement, 'hide-level-' + this.currentHideLevel);
  }

}
