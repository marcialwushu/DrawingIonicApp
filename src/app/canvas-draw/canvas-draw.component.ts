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
  brushSize: number = 10;

  constructor(public platform: Platform, public renderer: Renderer) { 
      console.log('Hello CanvasDraw Component');
   }

  ngOnInit() {}

  ngAfterViewInit() {
    
  }

  handleStart(ev) {

  }

  handleMove(ev) {

  }

}
