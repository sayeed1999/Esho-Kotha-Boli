import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'newline'
})
export class NewlinePipe implements PipeTransform {

    transform(value: string) {
        return value.replace(/\n/g, '<br/>');
    }

}