import { Component, OnInit, ViewChild, Renderer } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-canvas-draw',
  templateUrl: './canvas-draw.component.html',
  styleUrls: ['./canvas-draw.component.scss'],
})
export class CanvasDrawComponent implements OnInit {

  @ViewChild('myCanvas',{ static: true }) canvas: any;

  canvasElement: any;
  lastX: number;
  lastY: number;

  currentColour: string = '#1abc9c';
  avaliableColours: any;

  brushSize: number = 10;

  constructor(public platform: Platform, public renderer: Renderer) { 
      console.log('Hello CanvasDraw Component');

      this.avaliableColours = [
        '#1abc9c',
        '#3498db',
        '#9b59b6',
        '#e74c3c'
      ];
   }

  ngOnInit() {}

  ngAfterViewInit() {

    this.canvasElement = this.canvas.nativeElement;

    this.renderer.setElementAttribute(this.canvasElement, 'width', this.platform.width() + '');
    this.renderer.setElementAttribute(this.canvasElement, 'height', this.platform.height() + '');
  }

  changeColour(colour){
    this.currentColour = colour;
  }

  changeSize(size){
    this.brushSize = size;
  }

  handleStart(ev) {
    this.lastX = ev.touches[0].pageX;
    this.lastY = ev.touches[0].pageY;

  }

  handleMove(ev) {

    let ctx = this.canvasElement.getContext('2d');
    let currentX = ev.touches[0].pageX;
    let currentY = ev.touches[0].pageY;

    ctx.beginPath();
    ctx.lineJoin = "round";
    ctx.moveTo(this.lastX, this.lastY);
    ctx.lineTo(currentX, currentY);
    ctx.closePath();
    ctx.strokesStyle = this.currentColour;
    ctx.lineWidth = this.brushSize;
    ctx.stroke();

    this.lastX = currentX;
    this.lastY = currentY;
  

  }

  clearCanvas() {
    let ctx = this.canvasElement.getContext('2d');
    ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
  }

  saveCanvaImage(){
    var dataUrl = this.canvasElement.toDataURL();
    console.log('data: ', dataUrl);
  }

  b64toBlob(b64Data, contentType) {
    contentType = contentType || '';
    var sliceSize = 512;
    var byteCharacteres = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacteres.length; offset += sliceSize ){
        var slice = byteCharacteres.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }
    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

}
