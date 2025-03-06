import type { SideMenuHistoryOptionQueryParams } from "./side-menu-history-option-query-params";
import type { SideMenuOption } from "./side-menu-option";

export interface SideMenuHistoryOption extends SideMenuOption {
  id: string;
  label: string;
  subLabel: string;
  route: string;
  icon?: string;
  queryParams: SideMenuHistoryOptionQueryParams
}
