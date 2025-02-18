import {inject, NgZone} from '@angular/core';
import {WINDOW} from '@ng-web-apis/common';
import {
    tuiCreateTokenFromFactory,
    tuiTypedFromEvent,
    tuiZoneOptimized,
} from '@taiga-ui/cdk';
import {tuiIsMobile} from '@taiga-ui/core/utils';
import {distinctUntilChanged, map, share, startWith} from 'rxjs';

import {TUI_MEDIA} from './media';

/**
 * @deprecated use {@link https://taiga-ui.dev/services/breakpoint-service TuiBreakpointService}
 * TODO: drop in v4.0
 * Mobile resolution stream for private providers
 */
export const TUI_IS_MOBILE_RES = tuiCreateTokenFromFactory(() => {
    const win = inject(WINDOW);
    const media = inject(TUI_MEDIA);

    return tuiTypedFromEvent(win, `resize`).pipe(
        share(),
        startWith(null),
        map(() => tuiIsMobile(win, media)),
        distinctUntilChanged(),
        tuiZoneOptimized(inject(NgZone)),
    );
});
