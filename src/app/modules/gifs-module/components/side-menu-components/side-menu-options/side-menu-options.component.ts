import { Component, signal, WritableSignal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import type { SideMenuOption } from '@modules/gifs/interfaces/side-menu-option';
import { Constants } from '@modules/gifs/utils/constants';

const {
  SIDE_MENU_OPTIONS_EXAMPLES,
  SIDE_MENU_OPTIONS_ROUTER_LINK_ACTIVE_STYLE
} = new Constants();

@Component({
  selector: 'app-side-menu-options',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './side-menu-options.component.html',
  styleUrl: './side-menu-options.component.css'
})
export class SideMenuOptionsComponent {
  //CONSTANTS
  public linkActiveStyle: string = SIDE_MENU_OPTIONS_ROUTER_LINK_ACTIVE_STYLE;

  //SIGNALS
  public menuOptions: WritableSignal<Array<SideMenuOption>> = signal(SIDE_MENU_OPTIONS_EXAMPLES);
}
