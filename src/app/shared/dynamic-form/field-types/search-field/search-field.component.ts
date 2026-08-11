import { Component , input , output , EventEmitter } from '@angular/core';
import { FormControl , ReactiveFormsModule} from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';

import { debounceTime , distinctUntilChanged } from 'rxjs';

import { SearchField } from '../../../models/field-types/search-field.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-field',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslatePipe
  ],
  templateUrl: './search-field.component.html'
})
export class SearchFieldComponent {
  config = input.required<SearchField>();
  control = input.required<FormControl>();
  searchChange = output<string>();

  ngOnInit() {
    this.control().valueChanges
    .pipe(
      debounceTime(300),
      distinctUntilChanged()
    )
    .subscribe(value => {
      const searchValue = typeof value === 'string' ? value : '';
      this.searchChange.emit(searchValue);
    })
  }
  clear() {
    this.control().setValue('');
  }
}
