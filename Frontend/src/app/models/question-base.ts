import { AsyncValidatorFn, ValidatorFn } from "@angular/forms";

export class QuestionBase<T> {

    value: T|undefined;
    key: string;
    label: string;
    placeholder: string;
    controlType: string;
    type: string;
    options: { name: string, value: number }[];        
    validators: ValidatorFn | ValidatorFn[];
    asyncValidators: AsyncValidatorFn | AsyncValidatorFn[];

    constructor(
        options: {
            value?: T;
            key?: string;
            label?: string;
            placeholder?: string;
            controlType?: string;
            type?: string;
            options?: { name: string, value: number }[];
            validators?: ValidatorFn | ValidatorFn[];
            asyncValidators?: AsyncValidatorFn | AsyncValidatorFn[];
        } = {}
    ) {
        this.value = options.value;
        this.key = options.key || '';
        this.label = options.label || '';
        this.placeholder = options.placeholder || '';
        this.controlType = options.controlType || 'textbox';
        this.type = options.type || '';
        this.options = options.options ?? [];
        this.validators = options.validators ?? [];
        this.asyncValidators = options.asyncValidators ?? [];
    }
}