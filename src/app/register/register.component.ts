import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { API_URLS } from '../Interface/Api_URLS';


interface FileHandle {
  file: File,
  url: SafeUrl
}

interface userRegister {
  uid: string;
  nid: string;
  username: string;
  password: string;
  birthday: Date | null;
  address: string;
  roles: string;
  ts: Date;
  img: FileHandle[];
}


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private router: Router,private http: HttpClient, private sanitizer: DomSanitizer) {}

  navigateToLogin() {
    this.router.navigateByUrl('/login');
  }


  imageUrl: SafeUrl | undefined;

  userDetails : userRegister = {
    uid: '',
    nid: '',
    username: '',
    password: '',
    birthday: null,
    address: '',
    roles: 'User',
    img: [],
    ts: new Date,
    
  };

  onFileSelected(event: any) {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const fileHandle: FileHandle = {
        file: selectedFile,
        url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(selectedFile))
      };

      this.userDetails.img.push(fileHandle);
      this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(selectedFile));
    }
  }


    submitForm() {
      if (this.userDetails.nid && this.userDetails.username && 
          this.userDetails.password && this.userDetails.birthday &&
          this.userDetails.address && this.userDetails.img && this.userDetails.img.length > 0) {
            console.log(this.userDetails)
        const formData = new FormData();
        formData.append(
          'UserDemoModel',
          new Blob([JSON.stringify(this.userDetails)], { type: 'application/json' })
        );

        for (var i = 0; i < this.userDetails.img.length; i++) {
          formData.append(
            'image',
            this.userDetails.img[i].file,
            this.userDetails.img[i].file.name
          );
        }

        this.http.post(API_URLS.Local + API_URLS.Register, formData).subscribe(
          (res: any) => {
            console.log(res);
            alert(res.message);
            if (res.result) {
            }
          }
        );
      } else {
        alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      }
    }
  
  

}
