import { Component } from '@angular/core';
import { UrlServiceService } from '../../newProject8/Hadeel/HadeelURL/url-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-get-all-classes',
  templateUrl: './get-all-classes.component.html',
  styleUrl: './get-all-classes.component.css'
})
export class GetAllClassesComponent {
  constructor(private _ser: UrlServiceService, private _router: Router) { }

  ngOnInit() {
    this.getAllClasses();
  }

  ClassArray: any;

  getAllClasses() {
    this._ser.getAllClasses().subscribe((data) => {
      debugger
      this.ClassArray = data;
      console.log(this.ClassArray);
    });
  }
  classTimes: any[] = []; // Store the class times

  getClassTimes(classId: number) {
    this._ser.getClassTimes(classId).subscribe(
      (data: any[]) => {
        this.classTimes = data;
      },
      (error) => {
        console.error('Error fetching class times', error);
      }
    );
  }
  remove(id: any) {
    this._ser.removeClass(id).subscribe((data) => {
      alert("Class Removed successfully!")
      this._router.navigate(['/AdminDashBoard/ShowClass']);
    });
  }
}
