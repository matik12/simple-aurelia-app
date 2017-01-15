import { configure } from 'src/main';
import { Aurelia } from 'aurelia-framework';

describe('Main file', () => {
    let aurelia: Aurelia;

    beforeEach(() => {
        aurelia = jasmine.createSpyObj('Aurelia', ['use', 'start', 'setRoot']);
    });

    it('should start Aurelia when configure invoked', (done) => {
        // arrange
        const aureliaConfig = jasmine.createSpyObj('AureliaConfig', ['standardConfiguration', 'developmentLogging']);
        aurelia.use = aureliaConfig;
        (<jasmine.Spy>aurelia.start).and.callFake(() => {
            return new Promise(resolve => {
                resolve({});
            });
        });

        // act
        configure(aurelia);

        // assert
        expect(aurelia.start).toHaveBeenCalled();
        done();
    });
});