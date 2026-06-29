import { Component, Input , OnChanges , SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-btn-pagination',
  standalone: true,
  imports: [],
  templateUrl: './btn-pagination.component.html',
  styleUrls: ['./btn-pagination.component.scss']
})
export class BtnPaginationComponent {
  @Input() pageNumber!: number | string ;
  @Input() pageIndex: number = 0;
  get isActive(): boolean {
    return this.pageNumber === this.pageIndex;
  }
  ngOnChanges(changes : SimpleChanges): void {
    console.log('pageNumber:', this.pageNumber);
    console.log('pageIndex:', this.pageIndex);
  }
}
