import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { HeaderComponent } from './components/header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoginComponent, HeaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular-capstone');
}
