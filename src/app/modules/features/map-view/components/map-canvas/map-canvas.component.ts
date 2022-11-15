import { Component, OnInit, ViewChild, ElementRef, Inject, Input, Output, EventEmitter, OnDestroy } from "@angular/core";
import { TerrainType } from "@app/services/storage/interfaces";
import { ILoggerService, LOGGER_SERVICE } from "@app/shared/logger";
import { resolve } from "dns";
import { Observable, Subject, Subscription } from "rxjs";
import { IMapStateService, IMapTile, MAP_STATE_SERVICE } from "../..";

@Component({
  selector: 'app-map-canvas',
  templateUrl: './map-canvas.component.html',
  styleUrls: ['./map-canvas.component.scss'],
})
export class MapCanvasComponent implements OnInit, OnDestroy {
  private readonly loggerPrefix = "MapCanvas";

  @ViewChild('canvas', { static: true })
  mapCanvas: ElementRef<HTMLCanvasElement> | undefined;

  @Output() selectedMapTile = new EventEmitter<IMapTile>();


  //DRAWING PROP
  private mapSubscribtion$: Subscription = new Subscription();
  private gameMap: IMapTile[][] = [];
  private canvasWidth: number; 
  private canvasHeight: number;
  private shouldRefresh: boolean;
  private refreshRatio: number;
  private animationFrameId: number;
  
  private ctx: CanvasRenderingContext2D | undefined;

  //DRAWING CONSTANTS
  private readonly hexRatio = 0.865;
  private readonly columnOffset = 0.25;
  private readonly initSize = 150;
  private readonly movingPaddingRatio = 0.005;
  private readonly movingSpeedRatio = 0.002;
  private readonly paintingBorder = 0.05;
  private readonly mouseDragMargin = 0.001;
  private readonly scaleJumps = 0.02;
  private readonly scaleMaxValue = 0.6;
  private readonly scaleMinValue = 0.3;
  private scaleFactor = 0.5;

  //CALCULATING PROP
  private clickRegionCanvas = document.createElement('canvas');
  private clickRegionContext = this.clickRegionCanvas.getContext('2d');
  private regionMap = new Map<string, IMapTile>();
  private mouseDragged = false;
  private mouseDown = false;
  private mapOffsetX = 0;
  private mapOffsetY = 0;
  private mousePositionX = 0;
  private mousePositionY = 0;


  //MODEL PROP
  private selectedRegion: IMapTile | undefined;
  private hoverRegion: string = "";
  private paintingInProgress: boolean;
  private repaintRegion = true;

  private imagesPath = {
    terrain: {
      fields: "field.png",
      forest: "forest.png",
      sea: "sea.png"
    },
    selection: {
      hover: "selection_hover.png",
    },
    progress: {
      cities: {
        lv1: "field_city_1lv.png",
      }
    }
  };

  private imageMap: Map<string, HTMLImageElement> = new Map<string, HTMLImageElement>();

  constructor(
    @Inject(LOGGER_SERVICE) private readonly loggerService: ILoggerService,
    @Inject(MAP_STATE_SERVICE) public mapStateService: IMapStateService,
  ){
    this.canvasWidth = 0;
    this.canvasHeight = 0;
    this.shouldRefresh = false;
    this.refreshRatio = 30;
    this.animationFrameId = 0;
    this.ctx = undefined;
    this.paintingInProgress = false;
  }

  ngOnDestroy(): void {
    this.mapSubscribtion$.unsubscribe();
  }

  ngOnInit(): void {
    if(this.mapCanvas) {

      this.mapSubscribtion$ = this.mapStateService.subscribeMap().subscribe((map) => {
        this.gameMap = map;
        this.loggerService.debug(`Painting map after new data`, this.loggerPrefix);
        this.repaintCanvas();
      });

      this.paintingInProgress = true;
      this.fetchSize();
      
      this.ctx = this.mapCanvas.nativeElement.getContext('2d') || undefined;
      this.mapCanvas.nativeElement.onmousemove = (mouseEv) => this.onMove(mouseEv);
      this.mapCanvas.nativeElement.onmousedown = (mouseEv) => this.onClick(mouseEv);
      this.mapCanvas.nativeElement.onmouseup = (mouseev) => this.onRelease(mouseev);
      this.mapCanvas.nativeElement.onwheel = (wheelev) => this.onScroll(wheelev);
      this.loadImages();
    }
  }

  private fetchSize() {
    let canvasContainer = document.getElementById('canvas-container');
    if(this.mapCanvas && canvasContainer) {
      this.mapCanvas.nativeElement.height = canvasContainer.clientHeight;
      this.mapCanvas.nativeElement.width = canvasContainer.clientWidth;
      this.clickRegionCanvas.height = canvasContainer.clientHeight; 
      this.clickRegionCanvas.width = canvasContainer.clientWidth;
      this.canvasHeight = this.mapCanvas.nativeElement.height;
      this.canvasWidth = this.mapCanvas.nativeElement.width;
    }
  }

  private repaintCanvas() {
    this.fetchSize();
    this.repaintRegion = true;
    this.paintingInProgress = true;
    this.paintMap();
  }

  private async moveMap() {
    let leftPadding, rightPadding, topPadding, bottomPadding;
    do {

      let movingPaddingWidth = this.canvasWidth * this.movingPaddingRatio;
      let movingPaddingHeight = this.canvasHeight * this.movingPaddingRatio;
      leftPadding = this.mousePositionX < movingPaddingWidth && this.mousePositionX > 0;
      rightPadding = this.mousePositionX > (this.canvasWidth - movingPaddingWidth) && this.mousePositionX < this.canvasWidth;
      topPadding = this.mousePositionY < movingPaddingHeight && this.mousePositionY > 0;
      bottomPadding = this.mousePositionY > (this.canvasHeight - movingPaddingHeight) && this.mousePositionY < this.canvasHeight;
  
      //2nd check if map should be moved
      let xspeed = this.movingSpeedRatio*this.canvasWidth;
      let xdirection = ( leftPadding || rightPadding ? (leftPadding ? -xspeed : xspeed) : 0);
      let ydirection = (topPadding || bottomPadding ? (topPadding ? -xspeed : xspeed) : 0);
  
      if(leftPadding || rightPadding || topPadding || bottomPadding) {
        this.mapOffsetX -= xdirection;
        this.mapOffsetY -= ydirection;
        this.repaintCanvas();
        await this.wait(50);
        //console.log(`Moving map around by: ${this.mapOffsetX}, ${this.mapOffsetY}`);
      }
    } while(leftPadding || rightPadding || topPadding || bottomPadding);
  }

  private async dragMap(movementX: number, movementY: number) {
    this.mapOffsetX += movementX;
    this.mapOffsetY += movementY;
    this.repaintCanvas();
  }

  private wait(ms:number) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    })
  }

  //Loading images, painting after each images is loaded
  private loadImages() {
    this.paintingInProgress = true
    let loadingImages = 0;
    let imageToLoad = [];

    imageToLoad.push(this.imagesPath.progress.cities.lv1);
    imageToLoad.push(this.imagesPath.selection.hover);
    imageToLoad.push(this.imagesPath.terrain.fields);
    imageToLoad.push(this.imagesPath.terrain.forest);
    imageToLoad.push(this.imagesPath.terrain.sea);

    loadingImages = imageToLoad.length;
    for(let path of imageToLoad) {
      let image = new Image();
      image.onload = () => {
        loadingImages--;
        this.loggerService.info(`Loaded ${imageToLoad.length - loadingImages} out of ${ imageToLoad.length}`, this.loggerPrefix);
        if(loadingImages <= 0) {
          if(this.ctx) {
            this.paintMap();
          }
        }
      }
      image.src = `../../assets/images/${ path }`;
      this.imageMap.set(path, image);
    }
  }

  //Painting map on visible canvas
  private paintMap() {
    if(this.ctx && this.gameMap[0]) {
      this.ctx.clearRect(0,0,this.canvasWidth,this.canvasHeight);

      let size = this.scaleFactor * this.initSize;
      let cityImg = this.imageMap.get(this.imagesPath.progress.cities.lv1) || new Image();

      let hex_width = size;
      let hex_height = size * this.hexRatio;

      let minX = -1*this.canvasWidth*this.paintingBorder;
      let maxX = this.canvasWidth*(1+this.paintingBorder);
      let minY = -1*this.canvasHeight*this.paintingBorder;
      let maxY = this.canvasHeight*(1+this.paintingBorder);

      for( const row of this.gameMap){
        for( const mapTile of row) {

          let x = mapTile.position.x;
          let y = mapTile.position.y;

          let isOdd = x % 2 == 0;
          let offset = hex_width * this.columnOffset;
      
          let position_x = x * (size - offset)+this.mapOffsetX;
          let position_y = y * hex_height + (isOdd ? 0 : hex_height*0.5)+this.mapOffsetY;
          let x_belong = position_x > minX && position_x < maxX;
          let y_belong = position_y > minY && position_y < maxY;

          let terrainImg = new Image();

          switch(mapTile.district.terrain.type) {
            case TerrainType.FIELDS:
              terrainImg = this.imageMap.get(this.imagesPath.terrain.fields) || new Image();
              break;
            case TerrainType.FOREST:
              terrainImg = this.imageMap.get(this.imagesPath.terrain.forest) || new Image();
              break;
            case TerrainType.SEA:
              terrainImg = this.imageMap.get(this.imagesPath.terrain.sea) || new Image();
              break;
          }
          
          if(x_belong && y_belong) {
            this.ctx.drawImage(terrainImg, position_x, position_y, hex_width, hex_height);
            if(mapTile.kingdom) {
              this.ctx.drawImage(cityImg, position_x, position_y, hex_width, hex_height);
            }
          }
        }
      }

      if(this.repaintRegion && this.clickRegionContext) {
        this.paintRegionMap(this.clickRegionContext);
        this.repaintRegion = false;
      }
      
      this.paintingInProgress = false;
    } else {
      this.loggerService.error(`No driving context found`,this.loggerPrefix);
    }
  }

  /**
   * Painting region map on invisible canvas
   * @param context 
   */
  private paintRegionMap(context: CanvasRenderingContext2D) {
    context.clearRect(0,0,this.canvasWidth,this.canvasHeight);
    this.regionMap.clear();
    let size = this.scaleFactor * this.initSize;

    let hex_width = size;
    let hex_height = size * this.hexRatio;

    for( const row of this.gameMap){
      for( const mapTile of row) {

        let x = mapTile.position.x;
        let y = mapTile.position.y;

        let hexUniqueRGB = "";
        do{
          hexUniqueRGB = this.getRandomColor();
        } while(this.regionMap.has(hexUniqueRGB));
        this.regionMap.set(hexUniqueRGB, mapTile);

        let isOdd = x % 2 == 0;
        let offset = hex_width * this.columnOffset;
    
        let position_x = x * (size - offset) + this.mapOffsetX;
        let position_y = y * hex_height + (isOdd ? 0 : hex_height*0.5) + this.mapOffsetY;
    
        context.fillStyle = hexUniqueRGB;
        context.beginPath();
        context.arc(position_x+0.5*hex_width, position_y+0.5*hex_width, 0.55*hex_height, 0, 2*Math.PI, false);
        context.fill();
      }
    }
  }

  /**
   * Handler for mouse click event on canvas
   * @param mouseEv 
   */
  private onClick(mouseEv: MouseEvent) {
    if(mouseEv.button === 0) {
      this.mouseDown = true;
    }
  }

  private onRelease(mouseEv: MouseEvent) {
    console.log(`MOUSE UP: dragged: ${this.mouseDragged}`);
    if(mouseEv.button === 0) {
      if(!this.mouseDragged) {
        const regionKey = this.getRegionKey(mouseEv.offsetX, mouseEv.offsetY)
        const mapTile = this.regionMap.get(regionKey);
        this.loggerService.debug(
          `Selected: (${ mapTile?.position.x }, ${mapTile?.position.y})
          [${mapTile?.id}] => ${mapTile?.kingdom?.name}`,
          this.loggerPrefix);
        this.selectedMapTile.emit(mapTile);
      } else {
        this.mouseDragged = false;
      }
      this.mouseDown = false;
    }
  }

  /**
   * Handler for mouse move event on canvas
   * @param mouseEv 
   */
  private onMove(mouseEv: MouseEvent) {
    this.mousePositionX = mouseEv.offsetX;
    this.mousePositionY = mouseEv.offsetY;

    if(this.mouseDown) {
      if(
        Math.abs(mouseEv.movementX) > this.mouseDragMargin*this.canvasWidth ||
        Math.abs(mouseEv.movementY) > this.mouseDragMargin*this.canvasHeight
        ){
        this.mouseDragged = true;
      }
    }

    if(!this.mouseDragged){
      //1st, draw hex selection
      const regionKey = this.getRegionKey(mouseEv.offsetX, mouseEv.offsetY)
      const mapTile = this.regionMap.get(regionKey);
      if(mapTile && this.ctx) {
        this.repainHex(this.hoverRegion);
        this.hoverRegion = regionKey;
        this.paintOnHex(this.hoverRegion, this.imagesPath.selection.hover);
      }

      this.moveMap();
    } else {
      this.dragMap(mouseEv.movementX, mouseEv.movementY);
    }
    
  }

  private onScroll(wheelEv: WheelEvent) {
    let newScale =  this.scaleFactor + ( wheelEv.deltaY < 0 ? this.scaleJumps : -this.scaleJumps );
    if(newScale > this.scaleMinValue && newScale < this.scaleMaxValue) {
      this.scaleFactor = newScale;
      this.repaintCanvas();
    }
    console.log(`Scale factor: ${this.scaleFactor}`);
  }

  /**
   * Returning key for region in x,y pixels of map
   * @param clickX - pixel's x
   * @param clickY - pixel's y
   * @returns 
   */
  private getRegionKey(clickX: number, clickY: number): string {
    if(this.clickRegionContext) {
      const clickData = this.clickRegionContext.getImageData(clickX, clickY, 1, 1).data;
      return `rgb(${clickData[0]},${clickData[1]},${clickData[2]})`;
    } else {
      return "";
    }
  }

  /**
   * Painting image on visible canvas, using hex grid factor
   * @param x - hex column
   * @param y - hex row
   * @param imagePath - image
   */
  private paintInGrid(x: number, y: number, imagePath: string) {
    if(this.ctx) {
      let size = this.scaleFactor * this.initSize;
      let image = this.imageMap.get(imagePath) || new Image();
      this.paintHex(x, y, size, this.ctx, image);
    }
  }

  /**
   * Repainting while hex, with terrain, resources and progress level
   * @param key - repainted hex key
   */
  private repainHex(key: string) {
    let region = this.regionMap.get(key);
    if(region) {
      let terrainImg = "";

      switch(region.district.terrain.type) {
        case TerrainType.FIELDS:
          terrainImg = this.imagesPath.terrain.fields;
          break;
        case TerrainType.FOREST:
          terrainImg = this.imagesPath.terrain.forest;
          break;
        case TerrainType.SEA:
          terrainImg = this.imagesPath.terrain.sea;
          break;
      }

      this.paintInGrid(region.position.x, region.position.y, terrainImg );
      if(region.kingdom) this.paintInGrid(region.position.x, region.position.y, this.imagesPath.progress.cities.lv1);
    }
  }

  /**
   * Painting over the hex
   * @param key - hex to be painted over
   * @param imagePath - path to image
   */
  private paintOnHex(key: string, imagePath: string) {
    let region = this.regionMap.get(key);
    if(region) {
      this.paintInGrid(region.position.x, region.position.y, imagePath);
    }
  }
  
  /**
   * Start animating using browser support
   */
  public startAnimating() {
    this.animationFrameId = requestAnimationFrame(this.paintMap.bind(this));
  }

  /**
   * Stop animating using browser support
   */
  public stopAnimating() {
    cancelAnimationFrame(this.animationFrameId);
  }

  /**
   * Pain in hex-grid
   * @param x column
   * @param y row
   * @param size size in pixels
   * @param context canvas to draw on it
   * @param image image to be draw
   */
  private paintHex(x: number, y:number, size: number, context: CanvasRenderingContext2D, image: CanvasImageSource) {
    let hex_width = size;
    let hex_height = size * this.hexRatio;

    let isOdd = x % 2 == 0;
    let offset = hex_width * this.columnOffset;

    let position_x = x * (size - offset);
    let position_y = y * hex_height + (isOdd ? 0 : hex_height*0.5);
 
    context.drawImage(image, position_x+this.mapOffsetX, position_y+this.mapOffsetY, hex_width, hex_height); 
  }
  
  /**
   * Paint hex region
   * @param x column
   * @param y row
   * @param size size in pixels
   * @param mouseMap canvas to draw on ii
   * @param hexUniqueRGB color to fill
   */
  private paintHexRegion(x: number, y:number, size: number, mouseMap:CanvasRenderingContext2D, hexUniqueRGB: string) {
    
    let hex_width = size;
    let hex_height = size * this.hexRatio;
    let isOdd = x % 2 == 0;
    let offset = hex_width * this.columnOffset;

    let position_x = x * (size - offset);
    let position_y = y * hex_height + (isOdd ? 0 : hex_height*0.5);

    mouseMap.fillStyle = hexUniqueRGB;
    mouseMap.beginPath();
    mouseMap.arc(position_x+(0.5*hex_width)+this.mapOffsetX, position_y+(0.5*hex_width)+this.mapOffsetY, 0.55*hex_height, 0, 2*Math.PI, false);
    mouseMap.fill();
  }
  
  /**
   * Random color for region map
   * @returns return random color
   */
  private getRandomColor(): string {
    const r = Math.round(Math.random() * 255);
    const g = Math.round(Math.random() * 255);
    const b = Math.round(Math.random() * 255);
    return `rgb(${r},${g},${b})`;
   }
}