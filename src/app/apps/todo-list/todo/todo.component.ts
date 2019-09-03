import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  form;
  todoArray = [
    { task : 'Meeting with Urban Team' , completed : false },
    { task : 'Duplicate a project for new customer' , completed : false },
    { task : 'Project meeting with CEO' , completed : false },
    { task : 'Follow up of team zilla' , completed : false },
    { task : 'Level up for Antony' , completed : false }
  ];

  constructor(fb: FormBuilder) {

    this.form = fb.group({
      todoitem : ['', Validators.required]
    });

  }

  ngOnInit() {
  }

  addTodo() {
    let newTodoList = { task: '' , completed: false };
    newTodoList.task= this.form.value.todoitem;
    this.todoArray.push(newTodoList);
    this.form.reset();
  }
  removeTodoItem(item) {
   for(let i=0; i<=this.todoArray.length; i++) {
     if(item === this.todoArray[i]) {
       this.todoArray.splice(i, 1);
     }
   } 
  }
  changeTodoStatus(event,index) {
    if(event.target.checked) {
    this.todoArray[index]['completed'] = true; 
    } else {
      this.todoArray[index]['completed'] = false;
    }
  }

}