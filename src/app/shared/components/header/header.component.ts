import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-header',
  imports: [CommonModule, InputTextModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent {

}
