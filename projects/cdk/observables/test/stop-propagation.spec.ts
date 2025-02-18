import {fakeAsync} from '@angular/core/testing';
import {tuiStopPropagation} from '@taiga-ui/cdk';
import {first, Subject} from 'rxjs';

describe(`tuiStopPropagation operator function`, () => {
    it(`stops event propagation`, fakeAsync(() => {
        const event = new Event(`click`);
        const subject = new Subject<Event>();

        subject.pipe(tuiStopPropagation(), first()).subscribe();
        subject.next(event);

        expect(event.cancelBubble).toBe(true);
    }));
});
