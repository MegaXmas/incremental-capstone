import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class SidebarComponent implements OnInit {

  constructor() {
    // Initialization logic can go here if needed
  }

  ngOnInit(): void {
    // Logic to run when the component initializes
    console.log('Sidebar component initialized');
  }
}
