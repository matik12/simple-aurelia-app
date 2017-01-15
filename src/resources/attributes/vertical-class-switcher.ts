import { autoinject, bindable, customAttribute } from 'aurelia-framework';

@customAttribute('vertical-class-switcher')
@autoinject()
export class VerticalClassSwitcher {
    public static ScrollEventName: string = 'scroll';

    @bindable up: string;
    @bindable down: string;

    private isTicking: boolean = false;

    constructor(private element: Element) { }

    attached() {
        window.addEventListener(VerticalClassSwitcher.ScrollEventName, this.onScrollChange);
        this.onScrollChange();
    }

    detached() {
        window.removeEventListener(VerticalClassSwitcher.ScrollEventName, this.onScrollChange);
    }

    private onScrollChange = () => {
        if (!this.isTicking) {
            window.requestAnimationFrame(() => {
                this.checkElementPosition();
                this.isTicking = false;
            });
        }

        this.isTicking = true;
    }

    private checkElementPosition() {
        const elementOffsetTop = $(this.element).offset().top;
        const windowScrollPosition = $(window).scrollTop();
        const windowHeight = $(window).height();
        const isElementInUpperPartOfScreen: boolean = (elementOffsetTop - windowScrollPosition) < (windowHeight / 2);

        if (isElementInUpperPartOfScreen) {
            $(this.element).removeClass(this.up);
            $(this.element).addClass(this.down);
        } else {
            $(this.element).removeClass(this.down);
            $(this.element).addClass(this.up);
        }
    }
}