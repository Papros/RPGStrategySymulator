import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";

@Component({
  selector: 'map-canvas',
  template: `
    <canvas #canvas width="900" height="500"></canvas>
  `,
  styles: [],
})
export class MapCanvasComponent implements OnInit {

  @ViewChild('canvas', { static: true })
  mapCanvas: ElementRef<HTMLCanvasElement> | undefined;
  
  private ctx: CanvasRenderingContext2D | undefined;

  ngOnInit(): void {
    this.ctx = this.mapCanvas?.nativeElement.getContext('2d') || undefined;
    console.log('MAP CANVAS INIT.');
  }

  private painMap() {
    if(this.ctx) {
      this.ctx.fillStyle = 'red'
      this.ctx.fillRect(0,0,10,10);
    }
  }

  public refresh() {
    if(this.ctx)
      this.painMap();
  }
  
}