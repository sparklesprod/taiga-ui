import {VIRTUAL_SCROLL_STRATEGY} from '@angular/cdk/scrolling';
import {ChangeDetectorRef, InjectionToken, Optional, Provider} from '@angular/core';
import {
    TUI_IS_IOS,
    TuiDayRange,
    TuiDestroyService,
    TuiScrollService,
    tuiWatch,
} from '@taiga-ui/cdk';
import {TUI_CALENDAR_DATE_STREAM} from '@taiga-ui/kit';
import {EMPTY, Observable, takeUntil} from 'rxjs';

import {TuiMobileCalendarStrategy} from './mobile-calendar.strategy';

/**
 * Stream for updating value
 */
export const TUI_VALUE_STREAM = new InjectionToken<Observable<TuiDayRange | null>>(
    `[TUI_VALUE_STREAM]`,
);

export const TUI_MOBILE_CALENDAR_PROVIDERS: Provider[] = [
    TuiDestroyService,
    TuiScrollService,
    {
        provide: VIRTUAL_SCROLL_STRATEGY,
        deps: [TUI_IS_IOS, TuiScrollService],
        useClass: TuiMobileCalendarStrategy,
    },
    {
        provide: TUI_VALUE_STREAM,
        deps: [
            [new Optional(), TUI_CALENDAR_DATE_STREAM],
            TuiDestroyService,
            ChangeDetectorRef,
        ],
        useFactory: (
            value$: Observable<TuiDayRange | null> | null,
            destroy$: Observable<void>,
            cdr: ChangeDetectorRef,
        ): Observable<TuiDayRange | null> =>
            (value$ || EMPTY).pipe(tuiWatch(cdr), takeUntil(destroy$)),
    },
];
