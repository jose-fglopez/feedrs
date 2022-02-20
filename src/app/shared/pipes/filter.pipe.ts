import { Pipe, PipeTransform } from '@angular/core';
import { Article } from '@shared/interfaces/article';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: Article[], searchTerm?: string) {
    if(!value) return null;
    if(!searchTerm) return value;

    return value.filter(article => article.title.toLowerCase().includes(searchTerm.toLowerCase()))
  }

  constructor() { }
}
