import { Component } from '@angular/core';

@Component({
  selector: 'app-info',
  standalone: false,
  templateUrl: './info.component.html',
  styleUrl: './info.component.css'
})
export class InfoComponent {
  selectedSection = 'public';

  sections = [
    {
      value: 'public',
      label: 'Public Info',
      description: 'Update your public account.'
    },
    {
      value: 'private',
      label: 'Private Info',
      description: 'Manage sensitive information.'
    },
    {
      value: 'analytics',
      label: 'Analytics',
      description: 'View account statistics.'
    },
    {
      value: 'settings',
      label: 'Settings',
      description: 'Customized to your preference.'
    },
    {
      value: 'achievements',
      label: 'Achievements',
      description: 'A collection of your achievements.'
    }
  ];
}
