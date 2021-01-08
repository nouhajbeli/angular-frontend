import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { NewCourseService } from '../../services/new-course.service';
import { ProfileService } from '../../services/profile.service';
@Component({
  selector: 'app-newcourse',
  templateUrl: './newcourse.component.html',
  styleUrls: ['./newcourse.component.css'],
})
export class NewcourseComponent implements OnInit {
  files: any = [];
  store: any = [];
  categories = [
    'Math',
    'physics',
    'chemistry',
    'languages',
    'biology',
    'geology',
    'computer science',
    'economic',
    'management',
    'finance',
    'history ',
    'geography',
    'philosophy',
    'others',
  ];
  loginForm: any;
  user: any = JSON.parse(localStorage.getItem('user') || '{}');
  constructor(
    private service: NewCourseService,
    private profileService: ProfileService
  ) {
    this.loginForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      selectedOption: new FormControl(null, Validators.required),
      video: new FormControl(null, Validators.required),
      pdf: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      type: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
    });
  }
  Logout() {
    localStorage.clear();
  }
  ngOnInit(): void {
    for (var ele of this.user.store) {
      this.store.push(ele._id);
    }
  }
  // isValid(controlName: String) {
  //   return (
  //     this.loginForm.get(controlName).invalid &&
  //     this.loginForm.get(controlName).touched
  //   );
  // }
  onSelectVideo(event: any) {
    console.log(event.target.files);

    this.files.push(event.target.files[0]);
  }
  onSelectPdf(event: any) {
    console.log(event.target.files);
    this.files.push(event.target.files[0]);
  }
  addCourse() {
    console.log(this.files);
    console.log(this.loginForm.get('type').value);
    this.loginForm.video = this.files[1];
    this.loginForm.pdf = this.files[0];

    this.service
      .addService(
        this.user._id,
        this.loginForm.value.title,
        this.loginForm.value.description,
        this.loginForm.pdf,
        this.loginForm.video,
        this.loginForm.value.selectedOption,
        this.loginForm.value.type,
        this.loginForm.value.price || 0
      )
      .subscribe((res: any) => {
        this.videInput();
        this.store.push(res._id);
        this.user.store.push(res);
        localStorage.setItem('user', JSON.stringify(this.user));
        this.profileService
          .update(this.user._id, { store: this.store })
          .subscribe(() => console.log('profile updated'));
      });
  }
  videInput() {
    this.loginForm.value.title = '';
    this.loginForm.value.description = '';
    this.loginForm.pdf = '';
    this.loginForm.video = '';
    this.loginForm.value.selectedOption = '';
    this.loginForm.value.type = '';
    this.loginForm.value.price = '';
  }
}
