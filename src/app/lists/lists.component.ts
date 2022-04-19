import { Component, OnInit } from '@angular/core';
import { Member } from '../_models/member';
import { Pagination } from '../_models/pagination';
import { LikeService } from '../_services/like.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {

  //we use partial because each one of the property of member will optional
  members: Partial<Member[]> | any;
  pagination: Pagination | any
  predicate = 'liked';
  pageNumber = 1;
  pageSize = 5;

  constructor(private likeService: LikeService) { }

  ngOnInit(): void {
    this.loadLikes()
  }

  loadLikes() {
    this.likeService.getLikes(this.predicate, this.pageNumber, this.pageSize)
      .subscribe(response => {
        //console.log(response)
        this.pagination = response.pagination
        this.members = response.result;    
      })
  }

  pageChanged(event: any) {
     this.pageNumber = event.page;
     this.loadLikes();
    //console.log(event)
  }

}
