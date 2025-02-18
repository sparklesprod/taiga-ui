import {tuiSmartSearch} from '@taiga-ui/core';
import {from, Observable, of, skip, take} from 'rxjs';

describe(`tuiSmartSearch`, () => {
    let source: Observable<string>;

    beforeEach(() => {
        source = from([`search`]);
    });

    it(`starts with empty array`, () => {
        let result: unknown;
        const operator = tuiSmartSearch<string>((search: string) =>
            of([`${search}result`]),
        );

        operator(source)
            .pipe(take(1))
            .subscribe(value => {
                result = value;
            });

        expect(result).toEqual([]);
    });

    it(`returns null starting search`, () => {
        let result: unknown;
        const operator = tuiSmartSearch<string>((search: string) =>
            of([`${search}result`]),
        );

        operator(source)
            .pipe(skip(1), take(1))
            .subscribe(value => {
                result = value;
            });

        expect(result).toBeNull();
    });

    it(`returns search result of function`, () => {
        let result: unknown;
        const operator = tuiSmartSearch<string>((search: string) =>
            of([`${search}result`]),
        );

        operator(source)
            .pipe(skip(2), take(1))
            .subscribe(value => {
                result = value;
            });

        // cspell:disable-next-line
        expect(result).toEqual([`searchresult`]);
    });

    it(`does not emit new value if it starts with previous`, () => {
        let result: unknown;
        let counter = 0;

        const operator = tuiSmartSearch<string>((search: string) => {
            counter++;

            return of([`${search}result`]);
        });

        // cspell:disable-next-line
        source = from([`search`, `searchhh`]);

        operator(source).subscribe({
            complete: () => {
                result = counter;
            },
        });

        expect(result).toBe(1);
    });
});
