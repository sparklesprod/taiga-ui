import {Component} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {tuiIsNativeFocused} from '@taiga-ui/cdk';
import {TuiTabsModule} from '@taiga-ui/kit';
import {tuiDispatchOnActive} from '@taiga-ui/testing';
import {NG_EVENT_PLUGINS} from '@tinkoff/ng-event-plugins';

// TODO: move to cypress component testing
xdescribe(`Tabs`, () => {
    @Component({
        template: `
            <tui-tabs [(activeItemIndex)]="activeItemIndex">
                <button
                    id="cards"
                    tuiTab
                >
                    Cards
                </button>
                <button
                    id="tariff"
                    tuiTab
                >
                    Rate
                </button>
                <button
                    id="calls"
                    disabled
                    tuiTab
                >
                    Challenges
                </button>
                <button
                    id="settings"
                    tuiTab
                >
                    Settings
                </button>
            </tui-tabs>
        `,
    })
    class TestComponent {
        activeItemIndex = 0;
    }

    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;
    let buttons: readonly HTMLElement[];

    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [TuiTabsModule],
            declarations: [TestComponent],
            providers: NG_EVENT_PLUGINS,
        });
        await TestBed.compileComponents();
        fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();
        component = fixture.componentInstance;
        buttons = [
            document.getElementById(`cards`)!,
            document.getElementById(`tariff`)!,
            document.getElementById(`calls`)!,
            document.getElementById(`settings`)!,
        ];
    });

    it(`Navigation by arrows works when going right`, () => {
        buttons[0].focus();
        tuiDispatchOnActive(`arrowRight`);
        fixture.detectChanges();

        expect(tuiIsNativeFocused(buttons[1])).toBe(true);
    });

    it(`Navigation by arrows works when going left`, () => {
        buttons[1].focus();
        tuiDispatchOnActive(`arrowLeft`);

        expect(tuiIsNativeFocused(buttons[0])).toBe(true);
    });

    it(`Navigation by arrows skips disabled when going right`, () => {
        buttons[1].focus();
        tuiDispatchOnActive(`arrowRight`);

        expect(tuiIsNativeFocused(buttons[3])).toBe(true);
    });

    it(`Navigation by arrows skips disabled when going left`, () => {
        buttons[3].focus();
        tuiDispatchOnActive(`arrowLeft`);

        expect(tuiIsNativeFocused(buttons[1])).toBe(true);
    });

    it(`Updates activeItemIndex`, () => {
        buttons[3].click();

        expect(component.activeItemIndex).toBe(3);
    });
});
