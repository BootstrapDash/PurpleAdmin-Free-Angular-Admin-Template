// Angular
import { Directive, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { animate, AnimationBuilder, AnimationPlayer, style } from '@angular/animations';
import { NavigationEnd, Router } from '@angular/router';
// RxJS
import { Subscription } from 'rxjs';

/**
 * Page load animation
 *
 */
@Directive({
	selector: '[contentAnimate]'
})
export class ContentAnimateDirective implements OnInit, OnDestroy {
	// Public properties
	player: AnimationPlayer;
	// Private properties
	private events: Subscription;

	/**
	 * Directive Consturctor
	 * @param el: ElementRef
	 * @param router: Router
	 * @param animationBuilder: AnimationBuilder
	 */
	constructor(
		private el: ElementRef,
		private router: Router,
		private animationBuilder: AnimationBuilder) {
	}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit(): void {
		// animate the content
		this.initAnimate();
		// animate page load
		this.events = this.router.events.subscribe(event => {
			if (event instanceof NavigationEnd) {
				this.player.play();
			}
		});
	}

	/**
	 * On destroy
	 */
	ngOnDestroy(): void {
		this.events.unsubscribe();
		this.player.destroy();
	}

	/**
	 * Animate page load
	 */
	initAnimate() {
		this.player = this.animationBuilder
			.build([
				// style({opacity: 0, transform: 'translateY(15px)'}),
				// animate(500, style({opacity: 1, transform: 'translateY(0)'})),
				// style({transform: 'none'}),
				style({
					transform: 'translateY(-1%)',
					opacity: 0,
          position: 'static',
          height: '100%'
				}),
				animate(
					'0.5s ease-in-out',
					style({transform: 'translateY(0%)', opacity: 1})
				)
			])
			.create(this.el.nativeElement);
	}
}
