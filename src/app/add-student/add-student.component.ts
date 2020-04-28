import { Component, OnInit, ViewChild } from '@angular/core';
import { Student } from '../shared/models/student';
import { StudentService } from '../shared/services/student.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {
  @ViewChild('addForm', {static: false}) addForm: NgForm;
  
  constructor(private studentService: StudentService,
    private route: ActivatedRoute, private toastr: ToastrService) { }
  public student = new Student();

  ngOnInit(): void {

    let id = this.route.snapshot.queryParams['id'];

    if (id) {
      // this.getStudent(this.student.id);
      this.getStudent(id);
    }
  }

  save() {
    if(this.addForm.valid){
    console.log(this.student);
    if (!this.student.id) {
      this.studentService.AddStudent({ ...this.student }).then((res) => {
        this.toastr.success('Hello',(this.student.firstName));
        this.addForm.resetForm();
      })
    } else {
      console.log(this.student);
      this.studentService.updateStudent(this.student).then(() => {
        this.toastr.success('Modification effectue avec succee', 'Toastr fun!');
        this.addForm.resetForm();
      })
    }
  }
  }

  getStudent(id: string) {
    this.studentService.getStudent(id).subscribe(res => {
      this.student = res.data() as Student;
      this.student.id = res.id;
    });
  }




}
