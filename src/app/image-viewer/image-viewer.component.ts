import { Component, HostListener, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { LoadingService } from '../Services/loading.service';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.css']
})
export class ImageViewerComponent implements OnInit {

  //Child HTMLElement used to get the img-container dimensions
  @ViewChild('imgContainer') imgContainer:any;
  //Inputs
  @Input() imgURL: any;
  @Input() imgTitle: any;
  @Input() imgRealWidth: any;
  @Input() imgRealHeight: any;
  @Input() maxZoomOut: any;
  @Input() maxZoomIn: any;
  @Input() stepSliderZoom: any;
  @Input() stepBtnZoom: any;
  @Input() stepMouseWheelZoom: any;
  @Input() realImgMapProportion : any;
  //Variables to save img-container dimensions
  containerWidth : any;
  containerHeight : any;

  //Intermediate variables used in diplayed dimensions calculation
  //This variables save the width and height of 100% img displaying
  //The 100% img displaying changes according to container dimensions
  displayHeight : any;
  displayWidth : any;
  
  //Percentage of displaying, inisialized 100
  displayingPercentage : number;

  //Displayed dimensions used in the ngStyle
  zoomDisplayHeight : any;
  zoomDisplayWidth : any;

  //Variable to save rotation 
  rotation : number;

  //Variable to save rotation state. it'll be incremented (+1) or decremented (-1) for each rotation
  rotationCounter : number;

  //Variable used to know whether the transition is active or not for the img and the slider
  transitionImgSliderActive: boolean;

  imgViewerContainer: any;
  
  //Variable used to calculate position when grabbing the illustration
  mouseDown: boolean;
  mouseXBeginValue: number;
  mouseYBeginValue: number;

  //Position of the illustration used in the ngstyle
  imgDisplayedtopPostion: number;
  imgDisplayedleftPostion: number;


  //Values of imgDisplayedtopPostion and imgDisplayedleftPostion before moving
  positionXIllustrationBeforeMove: number;
  positionYIllustrationBeforeMove: number;


  //Variable to save the initial position of the illustration
  defaultImgDisplayedTopPostion: number;
  defaultImgDisplayedLeftPostion: number;
  

  //temporary variables used to store and manipulate realImg dimensions without overread the @Input realimg dimenions
  tmpImgRealWidth: any;
  tmpImgRealHeight: any;

  mirrorEffectActive: boolean;
  mirrorEffectValue: number;
  
  mapActive: boolean;
  mapWidth: number;
  mapHeight: number;
  windowWidth: number;
  windowHeight: number;

  
  //Variables used as a landmark when rotate illustration and zoom it.
  newPositionLeftZero: number;
  newPositionTopZero: number;


  //Varibles for the polygone points (helps to illustrate the showed part of the picture in the map)
  topLeftPointX: number;
  topRightPointX: number;
  bottomLeftPointX: number;
  bottomRightPointX: number;
  topLeftPointY: number;
  topRightPointY: number;
  bottomLeftPointY: number;
  bottomRightPointY: number;  
  mapWidthContainer: number;
  mapHeightContainer: number;
  
  visiblePartTransformX: number;
  visiblePartTransformY: number;
  
  visiblePartTransformXBeforeMove: number;
  visiblePartTransformYBeforeMove: number;

  invisiblePartTransformX: number;
  invisiblePartTransformY: number;
  
  invisiblePartTransformXBeforeMove: number;
  invisiblePartTransformYBeforeMove: number;

  //Varibles for map invisible-part 
  topLeftPointXInvisiblePart: number;
  topRightPointXInvisiblePart: number;
  bottomLeftPointXInvisiblePart: number;
  bottomRightPointXInvisiblePart: number;
  topLeftPointYInvisiblePart: number;
  topRightPointYInvisiblePart: number;
  bottomLeftPointYInvisiblePart: number;
  bottomRightPointYInvisiblePart: number;

  //Variables for moving mouse in map
  mouseDownMap: boolean;


  //Varibles for defaults values of inputs
  defaultmaxZoomOut = 20;
  defaultmaxZoomIn = 800;
  defaultstepSliderZoom = 5;
  defaultstepBtnZoom = 20;
  defaultstepMouseWheelZoom = 10;
  defaultrealImgMapProportion = 3;




  constructor(@Inject(DOCUMENT) private document: any,
              private loadingService: LoadingService) {
    this.displayingPercentage = 100;
    this.transitionImgSliderActive = false;
    this.rotation = 0;
    this.rotationCounter = 0;
    this.mouseDown = false;
    this.mouseDownMap = false;
    this.mouseXBeginValue = 0;
    this.mouseYBeginValue = 0;
    this.imgDisplayedtopPostion = 0;
    this.imgDisplayedleftPostion = 0;
    this.positionXIllustrationBeforeMove= 0;
    this.positionYIllustrationBeforeMove= 0;
    this.defaultImgDisplayedTopPostion = 0;
    this.defaultImgDisplayedLeftPostion = 0;
    this.mirrorEffectActive = false;
    this.mapActive = true;
    this.mirrorEffectValue = 1; 
    this.mapWidth= 0;
    this.mapHeight= 0; 
    this.mapWidthContainer= 0;
    this.mapHeightContainer= 0;
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;
    this.newPositionLeftZero = 0;
    this.newPositionTopZero = 0;
    
    this.topLeftPointX = 0;
    this.topLeftPointY = 0;

    this.topRightPointX = 100;
    this.topRightPointY = 0;

    this.bottomLeftPointX = 0;
    this.bottomLeftPointY = 100;

    this.bottomRightPointX = 100;
    this.bottomRightPointY = 100;  
    
    this.topLeftPointXInvisiblePart = 0;
    this.topLeftPointYInvisiblePart = 0;

    this.topRightPointXInvisiblePart = 0;
    this.topRightPointYInvisiblePart= 0;

    this.bottomLeftPointXInvisiblePart = 0;
    this.bottomLeftPointYInvisiblePart = 0;

    this.bottomRightPointXInvisiblePart = 0;
    this.bottomRightPointYInvisiblePart = 0;

    this.visiblePartTransformX= 0;
    this.visiblePartTransformY= 0;
    this.visiblePartTransformXBeforeMove= 0;
    this.visiblePartTransformYBeforeMove= 0;

    this.invisiblePartTransformX= 0;
    this.invisiblePartTransformY= 0;
    this.invisiblePartTransformXBeforeMove= 0;
    this.invisiblePartTransformYBeforeMove= 0;

    if(this.maxZoomOut == null || this.maxZoomOut<10){
      this.maxZoomOut = this.defaultmaxZoomOut;
    }
    if(this.maxZoomIn == null || this.maxZoomIn>3200){
      this.maxZoomIn = this.defaultmaxZoomIn;
    }
    if(this.stepSliderZoom == null || this.stepSliderZoom<1 || this.stepSliderZoom>100){
      this.stepSliderZoom = this.defaultstepSliderZoom;
    }
    if(this.stepBtnZoom == null || this.stepBtnZoom<1 || this.stepBtnZoom>100){
      this.stepBtnZoom = this.defaultstepBtnZoom;
    }
    if(this.stepMouseWheelZoom == null || this.stepMouseWheelZoom<1 || this.stepMouseWheelZoom>100){
      this.stepMouseWheelZoom = this.defaultstepMouseWheelZoom;
    }
    if(this.realImgMapProportion == null || this.realImgMapProportion<2 || this.realImgMapProportion>4){
      this.realImgMapProportion = this.defaultrealImgMapProportion;
    }

  }

  ngOnInit(): void {
    this.imgViewerContainer = document.getElementById("image-viewer");
  }

  ngAfterViewInit(): void {
    this.tmpImgRealWidth = this.imgRealWidth;
    this.tmpImgRealHeight = this.imgRealHeight; 
    this.getImgContainerDimensions();  
    this.initializeDisplayedDimensions();
    this.zoomDisplayHeight = this.displayHeight;
    this.zoomDisplayWidth = this.displayWidth;
    this.displayingPercentage = 100;
    this.centerPosition();
    this.initDefaultPosition();
    this.initMapDimensions();
    this.initVisiblePartMap();
    this.initInvisiblePartMap();
    this.initMapInvisiblePartPolygonePoints();
    this.updateMapPolygonePointsZoom();
    this.loadingService.unDisplayLoading();
  }

  //Used for the devExtreme slider
  format(value: any) {
    return value + "%";
  }

  //EventListner to reinisialize img display when window resize
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.resetDisplaying();
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;
  }


  resetDisplaying(): void{
    this.tmpImgRealWidth = this.imgRealWidth;
    this.tmpImgRealHeight = this.imgRealHeight; 
    this.activeTransitionImgSlider();
    this.getImgContainerDimensions();
    this.initializeDisplayedDimensions();
    this.zoomDisplayHeight = this.displayHeight;
    this.zoomDisplayWidth = this.displayWidth;
    this.displayingPercentage = 100;
    this.rotation = 0;
    this.rotationCounter = 0;
    this.centerPosition();
    this.initMapDimensions();
    this.initVisiblePartMap();
    this.initInvisiblePartMap();
    this.updateMapPolygonePointsZoom();
  }

  zoomInBtn(): void{
    if(this.displayingPercentage < this.maxZoomIn){
      this.desactiveTransitionImgSlider();
      this.displayingPercentage = this.displayingPercentage + this.stepBtnZoom;
      this.zoomDisplayWidth = this.displayWidth * this.displayingPercentage / 100;
      this.zoomDisplayHeight = this.zoomDisplayWidth * this.displayHeight / this.displayWidth;
    }
  }

  zoomOutBtn(): void{
    if(this.displayingPercentage > this.maxZoomOut){
      this.desactiveTransitionImgSlider();
      this.displayingPercentage = this.displayingPercentage - this.stepBtnZoom;
      this.zoomDisplayWidth = this.displayWidth * this.displayingPercentage / 100;
      this.zoomDisplayHeight = this.zoomDisplayWidth * this.displayHeight / this.displayWidth;
    }
  }

  zoomInOutSlider(event: any): void{
      this.desactiveTransitionImgSlider();
      this.zoomDisplayWidth = this.displayWidth * this.displayingPercentage / 100;
      this.zoomDisplayHeight = this.zoomDisplayWidth * this.displayHeight / this.displayWidth;
      this.updatesPostZoom();
  }

  @HostListener('mousewheel', ['$event']) onMousewheel(event : any) {
    event.preventDefault();
    if(this.displayingPercentage >= this.maxZoomOut && this.displayingPercentage <= this.maxZoomIn){
      this.desactiveTransitionImgSlider();
      if(event.wheelDelta>0){
        this.displayingPercentage = this.displayingPercentage + this.stepMouseWheelZoom;
      }
      if(event.wheelDelta<0){
        this.displayingPercentage = this.displayingPercentage - this.stepMouseWheelZoom;
      }
      this.zoomDisplayWidth = this.displayWidth * this.displayingPercentage / 100;
      this.zoomDisplayHeight = this.zoomDisplayWidth * this.displayHeight / this.displayWidth;
    }
  }


  updatesPostZoom(): void{
        
      this.centerPosition();
      if(this.rotationCounter % 2 != 0){
        this.inverseDisplayZoomDimensions();
      }
      //For the map
      this.updateMapPolygonePointsZoom();
      this.initVisiblePartMap();
      this.initInvisiblePartMap();
  }

  rotateRight(): void{
    this.activeTransitionImgSlider();
    this.rotation = this.rotation + 90;
    this.rotationCounter = this.rotationCounter + 1;
      //reverse real img dimensions

      const oldtmpImgRealWidth = this.tmpImgRealWidth;
      this.tmpImgRealWidth = this.tmpImgRealHeight;
      this.tmpImgRealHeight = oldtmpImgRealWidth;

      //Reinitialize displayDimentions
      this.initializeDisplayedDimensions();
      this.zoomDisplayWidth = this.displayWidth * this.displayingPercentage / 100;
      this.zoomDisplayHeight = this.zoomDisplayWidth * this.displayHeight / this.displayWidth;
      
      this.centerPosition();

      if(this.rotationCounter % 2 != 0){
        this.inverseDisplayZoomDimensions();
      }
       
      this.inverseDimensionsMap();
      this.initInvisiblePartMap();
      this.updateMapPolygonePointsZoom();
  }

  rotateLeft(): void{
    this.activeTransitionImgSlider();
    this.rotation = this.rotation - 90;
    this.rotationCounter = this.rotationCounter - 1;
      //reverse real img dimensions

      const oldtmpImgRealWidth = this.tmpImgRealWidth;
      this.tmpImgRealWidth = this.tmpImgRealHeight;
      this.tmpImgRealHeight = oldtmpImgRealWidth;

      //Reinitialize displayDimentions
      this.initializeDisplayedDimensions();
      this.zoomDisplayWidth = this.displayWidth * this.displayingPercentage / 100;
      this.zoomDisplayHeight = this.zoomDisplayWidth * this.displayHeight / this.displayWidth;

      this.centerPosition();

      if(this.rotationCounter % 2 != 0){
        this.inverseDisplayZoomDimensions();
      }  
      
      this.inverseDimensionsMap();
      this.initInvisiblePartMap();
      this.updateMapPolygonePointsZoom();
  }

  openCloseFullscreen() {
    if(this.isFullScreen()){
      if (this.document.exitFullscreen) {
        this.document.exitFullscreen();
      } else if (this.document.mozCancelFullScreen) {
        /* Firefox */
        this.document.mozCancelFullScreen();
      } else if (this.document.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        this.document.webkitExitFullscreen();
      } else if (this.document.msExitFullscreen) {
        /* IE/Edge */
        this.document.msExitFullscreen();
      }
    }else{
      if (this.imgViewerContainer.requestFullscreen) {
        this.imgViewerContainer.requestFullscreen();
      } else if (this.imgViewerContainer.mozRequestFullScreen) {
        /* Firefox */
        this.imgViewerContainer.mozRequestFullScreen();
      } else if (this.imgViewerContainer.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        this.imgViewerContainer.webkitRequestFullscreen();
      } else if (this.imgViewerContainer.msRequestFullscreen) {
        /* IE/Edge */
        this.imgViewerContainer.msRequestFullscreen();
      }
    }
  }


  onMouseMove(event: any):void{
    if(this.mouseDown && this.displayingPercentage>100){
      this.desactiveTransitionImgSlider();
      const actualMouseX : number = Number(event.clientX);
      const actualMouseY : number = Number(event.clientY) ;
      const crossedDistanceX = (actualMouseX - this.mouseXBeginValue);
      const crossedDistanceY = (actualMouseY - this.mouseYBeginValue);
      const newLeftPosition = this.positionXIllustrationBeforeMove + crossedDistanceX;
      this.imgDisplayedleftPostion = newLeftPosition;
      const newTopPosition = this.positionYIllustrationBeforeMove + crossedDistanceY;
      this.imgDisplayedtopPostion = newTopPosition;


      //for the map
      this.visiblePartTransformX = this.visiblePartTransformXBeforeMove - (((crossedDistanceX/this.realImgMapProportion)*100)/this.displayingPercentage);
      this.visiblePartTransformY = this.visiblePartTransformYBeforeMove - (((crossedDistanceY/this.realImgMapProportion)*100)/this.displayingPercentage);

      this.invisiblePartTransformX = this.invisiblePartTransformXBeforeMove - (((crossedDistanceX/this.realImgMapProportion)*100)/this.displayingPercentage);
      this.invisiblePartTransformY = this.invisiblePartTransformYBeforeMove - (((crossedDistanceY/this.realImgMapProportion)*100)/this.displayingPercentage);
    }
  }

  onMouseMoveMap(event: any):void{
    if(this.mouseDownMap && this.displayingPercentage>100){
      this.desactiveTransitionImgSlider();
      const actualMouseX : number = Number(event.clientX);
      const actualMouseY : number = Number(event.clientY) ;
      const crossedDistanceX = (actualMouseX - this.mouseXBeginValue);
      const crossedDistanceY = (actualMouseY - this.mouseYBeginValue);
      const newLeftPosition = this.positionXIllustrationBeforeMove - (((crossedDistanceX*this.realImgMapProportion)/100)*this.displayingPercentage);
      this.imgDisplayedleftPostion = newLeftPosition;
      const newTopPosition = this.positionYIllustrationBeforeMove - (((crossedDistanceY*this.realImgMapProportion)/100)*this.displayingPercentage);
      this.imgDisplayedtopPostion = newTopPosition;


      //for the map
      this.visiblePartTransformX = this.visiblePartTransformXBeforeMove + (crossedDistanceX);
      this.visiblePartTransformY = this.visiblePartTransformYBeforeMove + (crossedDistanceY);

      this.invisiblePartTransformX = this.invisiblePartTransformXBeforeMove + (crossedDistanceX);
      this.invisiblePartTransformY = this.invisiblePartTransformYBeforeMove + (crossedDistanceY);
    }
  }

  onMouseDown(event : any): void{
    event.preventDefault();
    if(!this.mouseDown){
      this.mouseDown = true;
      this.mouseXBeginValue  = Number(event.clientX);
      this.mouseYBeginValue = Number(event.clientY);
      this.positionXIllustrationBeforeMove = this.imgDisplayedleftPostion;
      this.positionYIllustrationBeforeMove = this.imgDisplayedtopPostion;
      this.visiblePartTransformXBeforeMove = this.visiblePartTransformX;
      this.visiblePartTransformYBeforeMove = this.visiblePartTransformY;
      this.invisiblePartTransformXBeforeMove = this.invisiblePartTransformX;
      this.invisiblePartTransformYBeforeMove = this.invisiblePartTransformY;
    }
  }

  onMouseDownMap(event : any): void{
    event.preventDefault();
    if(!this.mouseDownMap){
      this.mouseDownMap = true;
      this.mouseXBeginValue  = Number(event.clientX);
      this.mouseYBeginValue = Number(event.clientY);
      this.positionXIllustrationBeforeMove = this.imgDisplayedleftPostion;
      this.positionYIllustrationBeforeMove = this.imgDisplayedtopPostion;
      this.visiblePartTransformXBeforeMove = this.visiblePartTransformX;
      this.visiblePartTransformYBeforeMove = this.visiblePartTransformY;
      this.invisiblePartTransformXBeforeMove = this.invisiblePartTransformX;
      this.invisiblePartTransformYBeforeMove = this.invisiblePartTransformY;
    }
  }

  onMouseRealeased(event : any): void{
    event.preventDefault();
    if(this.mouseDown){
      this.mouseDown = false;
    }
  }

  onMouseRealeasedMap(event : any): void{
    event.preventDefault();
    if(this.mouseDownMap){
      this.mouseDownMap = false;
    }
  }

  activeDesactiveMirrorEffect(): void{
    this.activeTransitionImgSlider();
    this.mirrorEffectActive = !this.mirrorEffectActive;
    this.mirrorEffectValue = -1 * this.mirrorEffectValue;
  }

  activeDesactiveMap(): void {
    this.mapActive = !this.mapActive;
  }

  onXClick(): void{
    this.mapActive = false;
  }


  centerPosition(): void{
    if(this.rotationCounter % 2 != 0){
      this.newPositionLeftZero = (this.zoomDisplayWidth - this.zoomDisplayHeight)/2 ;
      this.newPositionTopZero = (this.zoomDisplayHeight - this.zoomDisplayWidth)/2 ;
      this.imgDisplayedleftPostion =   (this.containerWidth / 2) - (this.zoomDisplayWidth/ 2) + this.newPositionLeftZero;
      this.imgDisplayedtopPostion =  (this.containerHeight / 2) - (this.zoomDisplayHeight/ 2) + this.newPositionTopZero;
    }else{
      this.imgDisplayedleftPostion =   (this.containerWidth / 2) - (this.zoomDisplayWidth/ 2);
      this.imgDisplayedtopPostion =  (this.containerHeight / 2) - (this.zoomDisplayHeight/ 2);
    }
  } 

  isFullScreen(): boolean{
    return document.fullscreenElement != null;
  }

  getFileName(): void{
    return this.imgURL.substring(this.imgURL.lastIndexOf('/')+1);
  }

  getImgContainerDimensions(): void{
    this.containerWidth = this.imgContainer.nativeElement.offsetWidth;
    this.containerHeight = this.imgContainer.nativeElement.offsetHeight;
  }


  initializeDisplayedDimensions(): void{

    //case when the hight of the img is bigger than the width
    if(this.tmpImgRealHeight > this.tmpImgRealWidth){
      //displayed height get conteiner height
      this.displayHeight = this.containerHeight;
      //Calculate width with rule of three
      this.displayWidth = this.containerHeight * this.tmpImgRealWidth / this.tmpImgRealHeight;

      //Case the calculated width is bigger than the container width
      if(this.displayWidth > this.containerWidth) {
        const oldDisplayWidth = this.displayWidth;
        this.displayWidth = this.containerWidth ;
        this.displayHeight = this.containerWidth * this.displayHeight / oldDisplayWidth;
      }
    }
    //case when the width of the img is bigger than the height
    else{
      //displayed width get conteiner width
      this.displayWidth = this.containerWidth ;
      //Calculate height with rule of three
      this.displayHeight = this.containerWidth * this.tmpImgRealHeight / this.tmpImgRealWidth;

      //Case the calculated height is bigger than the container height
      if(this.displayHeight > this.containerHeight ){
        const oldDisplayHeight = this.displayHeight;
        this.displayHeight = this.containerHeight;
        this.displayWidth = this.containerHeight * this.displayWidth / oldDisplayHeight;
      }
    }
  }

  activeTransitionImgSlider(): void{
    if(!this.transitionImgSliderActive){
      const textCss = `
      .dx-slider-handle{
          transition: all 0.2s ease-in-out;   
      }
      .dx-widget{
          transition: all 0.2s ease-in-out;   
      }
      .dx-trackbar-range{
          transition: all 0.2s ease-in-out;   
      }
      .dx-slider-range{
          transition: all 0.2s ease-in-out;   
      }
      .dx-slider-range-visible{
          transition: all 0.2s ease-in-out;   
      }
      .illustration{
        transition: all 0.2s ease-in-out;
      }
      `;
      document.getElementsByTagName('style')[0].append(textCss);
    }
    this.transitionImgSliderActive = true;
  }

  desactiveTransitionImgSlider(): void{
    if(this.transitionImgSliderActive){
      const textCss = `
      .dx-slider-handle{
          transition: all 0s ease-in-out;   
      }
      .dx-widget{
          transition: all 0s ease-in-out;   
      }
      .dx-trackbar-range{
          transition: all 0s ease-in-out;   
      }
      .dx-slider-range{
          transition: all 0s ease-in-out;   
      }
      .dx-slider-range-visible{
          transition: all 0s ease-in-out;   
      }
      .illustration{
        transition: all 0s ease-in-out;
      }
      `;
      document.getElementsByTagName('style')[0].append(textCss);
    }
    this.transitionImgSliderActive = false;
  }

  inverseDisplayZoomDimensions(): void{
    const aux = this.zoomDisplayHeight;
    this.zoomDisplayHeight = this.zoomDisplayWidth;
    this.zoomDisplayWidth = aux;
  }

  resetBtnDisabled(): boolean{
    return (this.displayingPercentage == 100 && this.rotation==0 && this.defaultImgDisplayedLeftPostion==this.imgDisplayedleftPostion && this.defaultImgDisplayedTopPostion== this.imgDisplayedtopPostion) 
  }
  
  initDefaultPosition(): void {
    this.defaultImgDisplayedTopPostion = this.imgDisplayedtopPostion;
    this.defaultImgDisplayedLeftPostion = this.imgDisplayedleftPostion;
  } 


  initMapDimensions(): void{
      this.mapWidth= this.displayWidth/this.realImgMapProportion;
      this.mapHeight= this.displayHeight/this.realImgMapProportion;
      this.mapWidthContainer= this.displayWidth/this.realImgMapProportion;
      this.mapHeightContainer= this.displayHeight/this.realImgMapProportion;
  }

  initVisiblePartMap():void{
    this.visiblePartTransformX = 0;
    this.visiblePartTransformY = 0;
  }

  initInvisiblePartMap(): void{
    this.invisiblePartTransformX = (-45 * (this.mapWidthContainer * 10))/100;
    this.invisiblePartTransformY = (-45 * (this.mapHeightContainer * 10))/100;
  }


  inverseDimensionsMap(): void{
    const aux = this.mapWidthContainer;
    this.mapWidthContainer= this.mapHeightContainer;
    this.mapHeightContainer= aux;  
  }

  updateMapPolygonePointsZoom(): void{


    this.initMapPolygonePoints();
    let zoomDisplayWidth = this.zoomDisplayWidth;
    let zoomDisplayHeight = this.zoomDisplayHeight;

    if(this.rotationCounter % 2 != 0){
      zoomDisplayWidth = this.zoomDisplayHeight;
      zoomDisplayHeight = this.zoomDisplayWidth;
    }


    if(zoomDisplayWidth > this.containerWidth){
      const percentageWidth = ( (1 - (this.containerWidth / zoomDisplayWidth)) * 100) / 2;

      this.topLeftPointX = this.topLeftPointX + percentageWidth;
      this.topRightPointX = this.topRightPointX - percentageWidth;
      this.bottomLeftPointX = this.bottomLeftPointX + percentageWidth;
      this.bottomRightPointX = this.bottomRightPointX - percentageWidth;
    }
    if(zoomDisplayHeight > this.containerHeight){
      const percentageHeight = ( (1 - (this.containerHeight / zoomDisplayHeight)) * 100) / 2;

      this.topLeftPointY = this.topLeftPointY + percentageHeight;
      this.topRightPointY = this.topRightPointY + percentageHeight;
      this.bottomLeftPointY = this.bottomLeftPointY - percentageHeight;
      this.bottomRightPointY = this.bottomRightPointY - percentageHeight;
    }

  }

  initMapPolygonePoints(): void{
    this.topLeftPointX = 0;
    this.topLeftPointY = 0;

    this.topRightPointX = 100;
    this.topRightPointY = 0;

    this.bottomLeftPointX = 0;
    this.bottomLeftPointY = 100;

    this.bottomRightPointX = 100;
    this.bottomRightPointY = 100; 
  }

  initMapInvisiblePartPolygonePoints(): void{
    this.topLeftPointXInvisiblePart = 45.01;
    this.topLeftPointYInvisiblePart = 45.01;

    this.topRightPointXInvisiblePart = 54.99;
    this.topRightPointYInvisiblePart= 45.01;

    this.bottomLeftPointXInvisiblePart = 45.01;
    this.bottomLeftPointYInvisiblePart = 54.99;

    this.bottomRightPointXInvisiblePart = 54.99;
    this.bottomRightPointYInvisiblePart = 54.99;
  }

}
