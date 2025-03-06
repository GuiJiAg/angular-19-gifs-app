import { inject, Injectable, signal, WritableSignal } from "@angular/core";
import { CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class RouterDynamicsLinksGuard implements CanActivate {
  //SIGNALS
  private _isInternalNavigation: WritableSignal<boolean> = signal<boolean>(false);

  //INJECTS
  private _router: Router = inject(Router);

  //IMPLEMENTS
  canActivate(): MaybeAsync<GuardResult> {
    if (this._isInternalNavigation()) {
      return true;
    } else {
      this._router.navigate(['']);
      return false;
    }
  }

  //PUBLIC FUNCTIONS
  public enableInternalNavigation(): void {
    this._isInternalNavigation.set(true);
  }
};
