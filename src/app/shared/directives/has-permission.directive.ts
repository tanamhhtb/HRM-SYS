import { Directive, inject, input, TemplateRef, ViewContainerRef, effect } from '@angular/core';
import { PermissionService } from '../../core/services/permission.service';

@Directive({
  selector: '[hasPermission]',
  standalone: true,
})
export class HasPermissionDirective {
  hasPermission = input<string>();

  private templateRef    = inject(TemplateRef);
  private viewContainer  = inject(ViewContainerRef);
  private permissionService = inject(PermissionService);

  constructor() {
    effect(() => {
      this.viewContainer.clear();

    const permission = this.hasPermission();
    const canHave = !permission || this.permissionService.hasPermission(permission);

      if (canHave) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      }
    })
  };
  
}