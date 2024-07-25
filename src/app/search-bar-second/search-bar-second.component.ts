import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-search-bar-second',
  templateUrl: './search-bar-second.component.html',
  styleUrl: './search-bar-second.component.css'
})
export class SearchBarSecondComponent {
  searchForm: FormGroup;
  @Output() searchEvent = new EventEmitter<any>();

  filters = [
    { value: 'updated_at', label: 'Month' },
    { value: 'updated_at', label: 'Department' }
  ];

  defaultFilter = 'updated_at';
  
  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      searchTerm: [''],
      filter: ['name']
    });

    this.searchForm.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(value => {
      this.searchEvent.emit(value);
    });
  }
}