import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'currencySoles',
})
export class CurrencySolesPipe implements PipeTransform {
    transform(value: number): string {
        return `S/ ${value.toFixed(2)}`;
    }
}
