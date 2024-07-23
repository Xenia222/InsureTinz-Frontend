import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
// import 'bootstrap';
// import 'jquery';
import { Router } from '@angular/router';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {


  sidebarToggle: boolean = true;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  toggleDropdown(id: string) {
    const dropdown = document.getElementById(id);

    if (dropdown) {
      dropdown.classList.toggle('hidden');
    }
  }
}
