import {Pipe,PipeTransform} from '@angular/core';
@Pipe({
name:'stringCast'
})
export class StringCastPipe implements PipeTransform{
    transform(index:number){
        
        return String(index);
    }
}