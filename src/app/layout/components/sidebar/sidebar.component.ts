import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { HasPermissionDirective } from '../../../shared/directives/has-permission.directive';
import { MENU_ITEM } from '../../menu-item';
import { MenuItem } from '../../models/menu-item.model';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, TranslatePipe, HasPermissionDirective],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  menuItems: MenuItem[] = MENU_ITEM;
}