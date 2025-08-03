import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent implements OnInit {

  // Properties to track user authentication state
  isLoggedIn: boolean = false;
  userName: string = '';

  // Inject Router service for navigation
  constructor(private router: Router) {}

  // Initialize component - runs when component loads
  ngOnInit(): void {
    // Check if user is logged in when component starts
    this.checkLoginStatus();
  }

  /**
   * Check if user is currently logged in
   * In a real app, this would check authentication service
   */
  checkLoginStatus(): void {
    // For demo purposes, check localStorage
    // In real app, use proper authentication service
    const token = localStorage.getItem('authToken');
    const user = localStorage.getItem('userName');
    
    if (token && user) {
      this.isLoggedIn = true;
      this.userName = user;
    } else {
      this.isLoggedIn = false;
      this.userName = '';
    }
  }

  /**
   * Handle user logout
   * Clears user data and redirects to home
   */
  onLogout(): void {
    // Clear user authentication data
    localStorage.removeItem('authToken');
    localStorage.removeItem('userName');
    
    // Update component state
    this.isLoggedIn = false;
    this.userName = '';
    
    // Redirect to home page
    this.router.navigate(['/home']);
    
    // Optional: Show success message
    alert('You have been logged out successfully!');
  }

  /**
   * Handle login button click
   * Navigates to login page
   */
  onLogin(): void {
    // Navigate to login page
    this.router.navigate(['/login']);
  }
}