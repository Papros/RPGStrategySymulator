import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";

@Component({
  selector: 'map-canvas',
  template: `
  <div id="canvas-container" style="width:100%; height: 100%">
    <canvas #canvas width="900" height="500"></canvas>
  </div>
  `,
  styles: [],
})
export class MapCanvasComponent implements OnInit {

  @ViewChild('canvas', { static: true })
  mapCanvas: ElementRef<HTMLCanvasElement> | undefined;

  private canvasWidth: number;
  private canvasHeight: number;
  private shouldRefresh: boolean;
  private refreshRatio: number;
  private animationFrameId: number;
  
  private ctx: CanvasRenderingContext2D | undefined;

  //DRAWING PROPERTIES
  private readonly hexRatio = 0.865;
  private readonly columnOffset = 0.25;
  private scaleFactor = 0.5;
  private readonly initSize = 150;

  private imagesPath = {
    terrain: {
      fields: "field.png",
    },
    progress: {
      cities: {
        lv1: "field_city_1lv.png",
      }
    }
  };

  private imageMap: Map<string, HTMLImageElement> = new Map<string, HTMLImageElement>();

  constructor(){
    this.canvasWidth = 0;
    this.canvasHeight = 0;
    this.shouldRefresh = false;
    this.refreshRatio = 30;
    this.animationFrameId = 0;
    this.ctx = undefined;
  }

  ngOnInit(): void {
    let canvasContainer = document.getElementById('canvas-container');
    if(this.mapCanvas && canvasContainer) {
      this.mapCanvas.nativeElement.height = canvasContainer.clientHeight;
      this.mapCanvas.nativeElement.width = canvasContainer.clientWidth;
      this.canvasHeight = this.mapCanvas.nativeElement.height;
      this.canvasWidth = this.mapCanvas.nativeElement.width;
      this.ctx = this.mapCanvas.nativeElement.getContext('2d') || undefined;
      //this.painMap();
      this.startAnimating();
    }
    console.log('MAP CANVAS INIT.');

    let image = new Image();
    image.onload = () => this.painMap.bind(this);
    image.src = `../../assets/images/${ this.imagesPath.terrain.fields }`;
    this.imageMap.set(this.imagesPath.terrain.fields, image);

  }

  private painMap() {
    if(this.ctx) {
      console.log('Trying to paint..PAINTING! XD');

      this.ctx.clearRect(0,0,this.canvasWidth,this.canvasHeight);

      let size = this.scaleFactor * this.initSize;
      let image = this.imageMap.get(this.imagesPath.terrain.fields) || new Image();

      for(let x = 0; x<30; x++) {
        for(let y = 0; y<15; y++) {
          this.paintHex(x,y,size,this.ctx, image);
        }
      }

      requestAnimationFrame(this.painMap.bind(this));
    } else {
      console.log('Trying to paint..NO PAINTING CONTEXT :(');
    }
  }

  private onHover() {

  }

  private onClick() {

  }

  private onDrag() {

  }
  
  public startAnimating() {
    this.animationFrameId = requestAnimationFrame(this.painMap.bind(this));
  }

  public stopAnimating() {
    cancelAnimationFrame(this.animationFrameId);
  }

  private paintHex(x: number, y:number, size: number, context: CanvasRenderingContext2D, image: CanvasImageSource) {
    let hex_width = size;
    let hex_height = size * this.hexRatio;

    let isOdd = x % 2 == 0;
    let offset = hex_width * this.columnOffset;

    let position_x = x * (size - offset);
    let position_y = y * hex_height + (isOdd ? 0 : hex_height*0.5);

    context.drawImage(image, position_x, position_y, hex_width, hex_height); 
  }
  
}