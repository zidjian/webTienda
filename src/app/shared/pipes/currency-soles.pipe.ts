import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'currencySoles',
})
export class CurrencySolesPipe implements PipeTransform {
    transform(value: number | string): string {
        if (typeof value === 'string') {
            value = parseFloat(value);
        }
        return `S/ ${value.toFixed(2)}`;
    }
}
