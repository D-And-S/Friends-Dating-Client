import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pagination } from '../_models/pagination';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  @Input() pagination: Pagination | any

  @Output() updatePageNumber = new EventEmitter<any>()

  constructor() { }

  ngOnInit(): void {

  }

  pageChanged(event: any) {
    this.updatePageNumber.emit(event)
  }

}
