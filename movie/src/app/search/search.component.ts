import { Component, OnInit } from '@angular/core';

import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { SearchService } from '../search.service'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  constructor(private fb: FormBuilder, private searchService: SearchService ) {}
  value = ''
  searchForm: FormGroup

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      searchInput: ['', [Validators.required, Validators.minLength(5)]]
    }) 
    // this.searchForm.valueChanges.subscribe(change => {
    //   this.searchService.getMovies(this.input)
    //   console.log(change)
    // })
  }
  onEnter(value: string) { 
    this.searchService.getMovies(value)
  }

  onSubmit() {
    this.searchService.getMovies(this.input)
    // this.submitService.submit(this.input) <-- example@Output() EM = new EventEmitter<FormInterface>();
  }

  get input() {
    return this.searchForm.get('searchInput').value
  }
}
