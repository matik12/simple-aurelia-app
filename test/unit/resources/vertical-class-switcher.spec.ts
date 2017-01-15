import { VerticalClassSwitcher } from 'src/resources/attributes/vertical-class-switcher';

describe('Vertical Class Switcher attribute', () => {
    let verticalClassSwitcher: VerticalClassSwitcher;
    let fakeUp = 'up';
    let fakeDown = 'down';

    beforeEach(() => {
        verticalClassSwitcher = new VerticalClassSwitcher(null);
        verticalClassSwitcher.up = fakeUp;
        verticalClassSwitcher.down = fakeDown;
    });

    it('should add listener to window scroll event when attached invoked', (done) => {
        // arrange
        const event = 'scroll';
        spyOn(window, 'addEventListener');
        spyOn(window, 'requestAnimationFrame');

        // act
        verticalClassSwitcher.attached();

        // assert
        expect(window.addEventListener).toHaveBeenCalledWith(event, (<any>verticalClassSwitcher).onScrollChange);
        done();
    });

    it('should remove listener to window scroll event when detached invoked', (done) => {
        // arrange
        const event = 'scroll';
        spyOn(window, 'removeEventListener');
        spyOn(window, 'requestAnimationFrame');

        // act
        verticalClassSwitcher.detached();

        // assert
        expect(window.removeEventListener).toHaveBeenCalledWith(event, (<any>verticalClassSwitcher).onScrollChange);
        done();
    });
});