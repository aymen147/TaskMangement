import { Component, AfterViewInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements AfterViewInit {
  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.initializeScript();
  }

  initializeScript(): void {
    let dragSrcEl: HTMLElement | null = null;

    const handleDragStart = (e: DragEvent) => {
      const target = e.target as HTMLElement;
      target.style.opacity = '0.1';
      target.style.border = '3px dashed #c4cad3';

      dragSrcEl = target;

      e.dataTransfer!.effectAllowed = 'move';
      e.dataTransfer!.setData('text/html', target.innerHTML);
    };

    const handleDragOver = (e: DragEvent) => {
      if (e.preventDefault) {
        e.preventDefault();
      }

      e.dataTransfer!.dropEffect = 'move';
      return false;
    };

    const handleDragEnter = (e: DragEvent) => {
      const target = e.target as HTMLElement;
      target.classList.add('task-hover');
    };

    const handleDragLeave = (e: DragEvent) => {
      const target = e.target as HTMLElement;
      target.classList.remove('task-hover');
    };

    const handleDrop = (e: DragEvent) => {
      if (e.stopPropagation) {
        e.stopPropagation(); // stops the browser from redirecting.
      }

      if (dragSrcEl && dragSrcEl !== e.target) {
        const target = e.target as HTMLElement;
        dragSrcEl.innerHTML = target.innerHTML;
        target.innerHTML = e.dataTransfer!.getData('text/html');
      }
      return false;
    };

    const handleDragEnd = (e: DragEvent) => {
      const target = e.target as HTMLElement;
      target.style.opacity = '1';
      target.style.border = '0';

      items.forEach((item: { classList: { remove: (arg0: string) => void; }; }) => {
        item.classList.remove('task-hover');
      });
    };

    const items = this.renderer.selectRootElement('.task', true);
    items.forEach((item: HTMLElement) => {
      this.renderer.listen(item, 'dragstart', handleDragStart);
      this.renderer.listen(item, 'dragenter', handleDragEnter);
      this.renderer.listen(item, 'dragover', handleDragOver);
      this.renderer.listen(item, 'dragleave', handleDragLeave);
      this.renderer.listen(item, 'drop', handleDrop);
      this.renderer.listen(item, 'dragend', handleDragEnd);
    });
  }
}
