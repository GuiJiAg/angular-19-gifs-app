import { Component, computed, inject, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import type { SideMenuOption } from '@modules/gifs/interfaces/side-menu-option';
import { Constants } from '@modules/gifs/utils/constants';
import { RouterDynamicsLinksGuard } from '../../../guards/router-dynamics-links.guard';
import { GiphyService } from '../../../services/apis/giphy.service';
import type { SideMenuHistoryOption } from '@modules/gifs/interfaces/side-menu-history-option';

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
export class SideMenuOptionsComponent implements OnInit {
  //CONSTANTS
  public linkActiveStyle: string = SIDE_MENU_OPTIONS_ROUTER_LINK_ACTIVE_STYLE;

  //SIGNALS
  public menuOptions: WritableSignal<Array<SideMenuOption>> = signal(SIDE_MENU_OPTIONS_EXAMPLES);
  public menuHistoryOptions: Signal<Array<SideMenuHistoryOption>> = computed( () => {
    return this._mapMenuHistoryOptions();
  });

  //INJECTS
  private _routerDynamicsLinksGuard: RouterDynamicsLinksGuard = inject(RouterDynamicsLinksGuard);
  private _giphyService: GiphyService = inject(GiphyService);

  //IMPLEMENTS
  ngOnInit(): void {
    /**
     * Esto permite que, este componente, pueda navegar de forma
     * interna a aquellas rutas donde se aplica este Guard
     */
    this._routerDynamicsLinksGuard.enableInternalNavigation();
  }

  //PRIVATE FUNCTIONS
  private _mapMenuHistoryOptions(): Array<SideMenuHistoryOption> {
    let gifsHistoryKeys: Array<string> = this._giphyService.searchGifsHistoryKeys();

    return gifsHistoryKeys.map( (key) => {
      let uuid = uuidv4();

      return {
        id: uuid,
        label: key,
        subLabel: `${key} Gifs`,
        route: `/dashboard/history/${key}/${uuid}`,
        icon: 'fa-solid fa-clock-rotate-left',
        queryParams: {
          key: key,
          id: uuid
        }
      }
    });
  }
}
