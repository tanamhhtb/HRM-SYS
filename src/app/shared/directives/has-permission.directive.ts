import { Directive, inject, input, TemplateRef, ViewContainerRef, effect } from '@angular/core';
import { PermissionService } from '../../core/services/permission.service';

@Directive({
  selector: '[hasPermission]',
  standalone: true,
})
export class HasPermissionDirective {
  hasPermission = input.required<string>();

  private templateRef    = inject(TemplateRef);
  private viewContainer  = inject(ViewContainerRef);
  private permissionService = inject(PermissionService);

  constructor() {
    effect(() => {
      this.viewContainer.clear();

      if (this.permissionService.hasPermission(this.hasPermission())) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
    });
  }
}