import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pagination } from '../_models/pagination';

@Component({
  selector: 'app-custom-pagination',
  templateUrl: './custom-pagination.component.html',
  styleUrls: ['./custom-pagination.component.css']
})
export class CustomPaginationComponent implements OnInit {

  @Input() pagination: Pagination | any

  @Input() currentPage: number | any;

  @Output() updatePageNumber = new EventEmitter<any>()

  constructor() { }

  ngOnInit(): void {

  }

  pageChanged(event: any) {
    this.updatePageNumber.emit(event)
  }

}
