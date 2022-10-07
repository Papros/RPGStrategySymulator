import { Component, OnInit, ViewChild, ElementRef, Inject, Input, Output, EventEmitter } from "@angular/core";
import { ILoggerService, LOGGER_SERVICE } from "@app/shared/logger";
import { IMapTile } from "../..";

@Component({
  selector: 'map-canvas',
  templateUrl: './map-canvas.component.html',
  styleUrls: ['./map-canvas.component.scss'],
})
export class MapCanvasComponent implements OnInit {
  private readonly loggerPrefix = "MapCanvas";
  @ViewChild('canvas', { static: true })
  mapCanvas: ElementRef<HTMLCanvasElement> | undefined;

  @Input() gameMap: IMapTile[][] = [];
  @Output() selectedMapTile = new EventEmitter<IMapTile>();

  //DRAWING PROP
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
  private scaleFactor = 0.5;

  //CALCULATING PROP
  private clickRegionCanvas = document.createElement('canvas');
  private clickRegionContext = this.clickRegionCanvas.getContext('2d');
  private regionMap = new Map<string, IMapTile>();

  //MODEL PROP
  private selectedRegion: IMapTile | undefined;
  private hoverRegion: string = "";
  private paintingInProgress: boolean;
  private repaintRegion = true;

  private imagesPath = {
    terrain: {
      fields: "field.png",
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
  ){
    this.canvasWidth = 0;
    this.canvasHeight = 0;
    this.shouldRefresh = false;
    this.refreshRatio = 30;
    this.animationFrameId = 0;
    this.ctx = undefined;
    this.paintingInProgress = false;
  }

  ngOnInit(): void {
    let canvasContainer = document.getElementById('canvas-container');

    if(this.mapCanvas && canvasContainer) {
      this.paintingInProgress = true;
      this.mapCanvas.nativeElement.height = canvasContainer.clientHeight;
      this.mapCanvas.nativeElement.width = canvasContainer.clientWidth;
      this.clickRegionCanvas.height = canvasContainer.clientHeight; 
      this.clickRegionCanvas.width = canvasContainer.clientWidth;
      this.canvasHeight = this.mapCanvas.nativeElement.height;
      this.canvasWidth = this.mapCanvas.nativeElement.width;
      this.ctx = this.mapCanvas.nativeElement.getContext('2d') || undefined;

      this.mapCanvas.nativeElement.onmousemove = (mouseEv) => this.onMove(mouseEv);
      this.mapCanvas.nativeElement.onmousedown = (mouseEv) => this.onClick(mouseEv);
      this.loadImages();
    }
  }

  private loadImages() {
    this.paintingInProgress = true
    let loadingImages = 0;
    let imageToLoad = [];

    imageToLoad.push(this.imagesPath.progress.cities.lv1);
    imageToLoad.push(this.imagesPath.selection.hover);
    imageToLoad.push(this.imagesPath.terrain.fields);

    loadingImages = imageToLoad.length;
    for(let path of imageToLoad) {
      let image = new Image();
      image.onload = () => {
        loadingImages--;
        this.loggerService.info(`Loaded ${imageToLoad.length - loadingImages} out of ${ imageToLoad.length}`, this.loggerPrefix);
        if(loadingImages <= 0) {
          if(this.ctx) {
            this.painMap();
          }
        }
      }
      image.src = `../../assets/images/${ path }`;
      this.imageMap.set(path, image);
    }
  }

  private painMap() {
    if(this.ctx) {
      this.ctx.clearRect(0,0,this.canvasWidth,this.canvasHeight);

      let size = this.scaleFactor * this.initSize;
      let terrainImg = this.imageMap.get(this.imagesPath.terrain.fields) || new Image();
      let cityImg = this.imageMap.get(this.imagesPath.progress.cities.lv1) || new Image();

      let mapWidth = this.gameMap[0].length;
      let mapHeight = this.gameMap.length;

      let hex_width = size;
      let hex_height = size * this.hexRatio;

      for( const row of this.gameMap){
        for( const mapTile of row) {

          let x = mapTile.position.x;
          let y = mapTile.position.y;

          let isOdd = x % 2 == 0;
          let offset = hex_width * this.columnOffset;
      
          let position_x = x * (size - offset);
          let position_y = y * hex_height + (isOdd ? 0 : hex_height*0.5);

          this.ctx.drawImage(terrainImg, position_x, position_y, hex_width, hex_height);
          if(mapTile.kingdom) {
            this.ctx.drawImage(cityImg, position_x, position_y, hex_width, hex_height);
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

  private paintRegionMap(context: CanvasRenderingContext2D) {
    context.clearRect(0,0,this.canvasWidth,this.canvasHeight);
    this.regionMap.clear();
    let size = this.scaleFactor * this.initSize;

    let mapWidth = this.gameMap[0].length;
    let mapHeight = this.gameMap.length;
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
    
        let position_x = x * (size - offset);
        let position_y = y * hex_height + (isOdd ? 0 : hex_height*0.5);
    
        context.fillStyle = hexUniqueRGB;
        context.beginPath();
        context.arc(position_x+0.5*hex_width, position_y+0.5*hex_width, 0.55*hex_height, 0, 2*Math.PI, false);
        context.fill();
      }
    }
  }

  private onClick(mouseEv: MouseEvent) {
    const regionKey = this.getRegionKey(mouseEv.offsetX, mouseEv.offsetY)
    const mapTile = this.regionMap.get(regionKey);
    this.loggerService.debug(
      `Selected: (${ mapTile?.position.x }, ${mapTile?.position.y})
      [${mapTile?.id}] => ${mapTile?.kingdom?.name}`,
      this.loggerPrefix);
    this.selectedMapTile.emit(mapTile);
  }

  private onMove(mouseEv: MouseEvent) {
    const regionKey = this.getRegionKey(mouseEv.offsetX, mouseEv.offsetY)
    const mapTile = this.regionMap.get(regionKey);
    if(mapTile && this.ctx) {
      this.repainHex(this.hoverRegion);
      this.hoverRegion = regionKey;
      this.paintSelection(this.hoverRegion, this.imagesPath.selection.hover);
    }
  }

  private getRegionKey(clickX: number, clickY: number): string {
    if(this.clickRegionContext) {
      const clickData = this.clickRegionContext.getImageData(clickX, clickY, 1, 1).data;
      return `rgb(${clickData[0]},${clickData[1]},${clickData[2]})`;
    } else {
      return "";
    }
  }

  private paintOnHex(x: number, y: number, imagePath: string) {
    if(this.ctx) {
      let size = this.scaleFactor * this.initSize;
      let image = this.imageMap.get(imagePath) || new Image();
      this.paintHex(x, y, size, this.ctx, image);
    }
  }

  private repainHex(key: string) {
    let region = this.regionMap.get(key);
    if(region) {
      this.paintOnHex(region.position.x, region.position.y, this.imagesPath.terrain.fields);
      if(region.kingdom) this.paintOnHex(region.position.x, region.position.y, this.imagesPath.progress.cities.lv1);
    }
  }

  private paintSelection(key: string, imagePath: string) {
    let region = this.regionMap.get(key);
    if(region) {
      this.paintOnHex(region.position.x, region.position.y, imagePath);
    }
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
  
  private paintHexRegion(x: number, y:number, size: number, mouseMap:CanvasRenderingContext2D, hexUniqueRGB: string) {
    
    let hex_width = size;
    let hex_height = size * this.hexRatio;
    let isOdd = x % 2 == 0;
    let offset = hex_width * this.columnOffset;

    let position_x = x * (size - offset);
    let position_y = y * hex_height + (isOdd ? 0 : hex_height*0.5);

    mouseMap.fillStyle = hexUniqueRGB;
    mouseMap.beginPath();
    mouseMap.arc(position_x+0.5*hex_width, position_y+0.5*hex_width, 0.55*hex_height, 0, 2*Math.PI, false);
    mouseMap.fill();
  }
  
  private getRandomColor(): string {
    const r = Math.round(Math.random() * 255);
    const g = Math.round(Math.random() * 255);
    const b = Math.round(Math.random() * 255);
    return `rgb(${r},${g},${b})`;
   }
}