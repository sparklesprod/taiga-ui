import {ElementRef, Inject, Injectable, NgZone} from '@angular/core';
import {MutationObserverService} from '@ng-web-apis/mutation-observer';
import {tuiClamp, TuiResizeService, tuiZoneOptimized} from '@taiga-ui/cdk';
import {distinctUntilChanged, map, merge, Observable, share, throttleTime} from 'rxjs';

import {TuiItemsWithMoreDirective} from './items-with-more.directive';

@Injectable()
export class TuiItemsWithMoreService extends Observable<number> {
    readonly stream$ = merge(this.directive.change$, this.mutation$, this.resize$).pipe(
        throttleTime(0),
        map(() => this.getOverflowIndex()),
        distinctUntilChanged(),
        tuiZoneOptimized(this.zone),
        share(),
    );

    constructor(
        @Inject(NgZone) private readonly zone: NgZone,
        @Inject(ElementRef) private readonly el: ElementRef<HTMLElement>,
        @Inject(MutationObserverService) private readonly mutation$: Observable<unknown>,
        @Inject(TuiResizeService) private readonly resize$: Observable<unknown>,
        @Inject(TuiItemsWithMoreDirective)
        private readonly directive: TuiItemsWithMoreDirective,
    ) {
        super(subscriber => this.stream$.subscribe(subscriber));
    }

    private getOverflowIndex(): number {
        const {clientWidth, children} = this.el.nativeElement;
        const items = Array.from(children, ({clientWidth}) => clientWidth);
        const first = this.directive.required === -1 ? 0 : this.directive.required;
        const last = items.length - 1;
        const more = children[last]?.tagName === `SPAN` ? items[last] : 0;

        items.unshift(...items.splice(first, 1));

        let total = items.reduce((sum, width) => sum + width, 0) - more;

        if (total <= clientWidth && this.directive.itemsLimit >= items.length) {
            return this.maxItems;
        }

        for (let i = last - 1; i > 0; i--) {
            total -= items[i];

            if (total + more <= clientWidth) {
                return tuiClamp(
                    i > this.directive.required ? i - 1 : i - 2,
                    -1,
                    this.maxItems,
                );
            }
        }

        return -1;
    }

    private get maxItems(): number {
        return this.directive.itemsLimit > this.directive.required
            ? this.directive.itemsLimit - 1
            : this.directive.itemsLimit - 2;
    }
}
