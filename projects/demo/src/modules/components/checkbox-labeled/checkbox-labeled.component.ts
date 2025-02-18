import {Component, forwardRef} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup} from '@angular/forms';
import {changeDetection} from '@demo/emulate/change-detection';
import {TuiDocExample} from '@taiga-ui/addon-doc';
import {TuiSizeL} from '@taiga-ui/core';

import {AbstractExampleTuiControl} from '../abstract/control';
import {ABSTRACT_PROPS_ACCESSOR} from '../abstract/inherited-documentation/abstract-props-accessor';

@Component({
    selector: 'example-tui-checkbox-labeled',
    templateUrl: './checkbox-labeled.template.html',
    changeDetection,
    providers: [
        {
            provide: ABSTRACT_PROPS_ACCESSOR,
            useExisting: forwardRef(() => ExampleTuiCheckboxLabeledComponent),
        },
    ],
})
export class ExampleTuiCheckboxLabeledComponent extends AbstractExampleTuiControl {
    readonly exampleForm = import('./examples/import/declare-form.md?raw');
    readonly exampleModule = import('./examples/import/import-module.md?raw');
    readonly exampleHtml = import('./examples/import/insert-template.md?raw');

    readonly example1: TuiDocExample = {
        TypeScript: import('./examples/1/index.ts?raw'),
        HTML: import('./examples/1/index.html?raw'),
        LESS: import('./examples/1/index.less?raw'),
    };

    readonly example2: TuiDocExample = {
        TypeScript: import('./examples/2/index.ts?raw'),
        HTML: import('./examples/2/index.html?raw'),
    };

    override readonly sizeVariants: readonly TuiSizeL[] = ['m', 'l'];

    override size: TuiSizeL = this.sizeVariants[0];

    control = new UntypedFormGroup({
        testValue1: new UntypedFormControl(false),
        testValue2: new UntypedFormControl(),
        testValue3: new UntypedFormControl(true),
    });

    constructor() {
        super();

        this.control.get('testValue1')!.valueChanges.subscribe(value => {
            if (value) {
                this.control.get('testValue1')!.setValue(false);
            }
        });
    }
}
