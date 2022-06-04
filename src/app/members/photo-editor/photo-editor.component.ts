import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { Photo } from 'src/app/_models/photo';
import { User } from 'src/app/_models/user';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { MemberService } from 'src/app/_services/member.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @ViewChild('fileInput', {static: false})
  myFileInput!: ElementRef;

  @Input() member!: Member

  uploader: FileUploader | any ;
  hasBaseDropZoneOver = false;
  user!: User | any;

  constructor(private accountService: AuthenticationService,
    private memberService: MemberService,
    private toastr: ToastrService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user)
  }

  ngOnInit(): void {
    this.initializeUploader();
  }

  fileOverBase(e: any) {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: environment.apiUrl + 'users/Add-Photo',
      authToken: 'Bearer ' + this.user?.token,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });


    this.uploader.onWhenAddingFileFailed = (item:any, filter:any) => {
      var fileSplit = item.name.split(/\.(?=[^\.]+$)/)
      var fileExt = fileSplit[1].toLowerCase()
     
      if(fileExt !== 'jpg' && fileExt !== 'png'){
        this.toastr.error("Please Upload Valid File !!!") 
        this.resetPhoto()
        return;
      }
      
      if(item.size > 10485760){
        this.toastr.error("File Is Too Large !!!")
        this.resetPhoto()
        return;
      }
   
    } 

  
    this.uploader.onAfterAddingFile = (file:any) => {
      file.withCredentials = false;
      //console.log("hello")
    }


    this.uploader.onSuccessItem = (item :any, response:any, status:any, headers:any) => {
      if (response) {
        const photo = JSON.parse(response);
        this.member.photos.push(photo)
        
        if(photo.isMain){
          this.user.photoUrl = photo.url;
          this.member.photoUrl = photo.url
          this.accountService.setCurrentUser(this.user);
        }
      }
    }
  }

  resetPhoto(){
    this.myFileInput.nativeElement.value = '';
  }

  setMainPhoto(photo: Photo) {
    this.memberService.setMainPhoto(photo.id).subscribe({
      next: (data) => {
        // we change the current photo url 
        this.user.photoUrl = photo.url;

        // set new user data in local storage
        this.accountService.setCurrentUser(this.user);

        //change the already set photo 
        this.member.photoUrl = photo.url

        //we have photo details in our member array we have to chagne data too
        this.member.photos.forEach(p => {
          if (p.isMain) p.isMain = false;
          if (p.id === photo.id) p.isMain = true;
        })       
        //this.toastr.success("Main Photo Has Been Set")
      }
    })
  }

  deletePhoto(photoId: number) {
    this.memberService.deletePhoto(photoId).subscribe({
      next: (photo) => {
        //this will return new array without current photoID
        this.member.photos = this.member.photos.filter(x => x.id !== photoId)
      }
    })
  }
}



