import { Component, Input, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

declare const AFRAME: any;

@Component({
  selector: 'app-angular-aframe-model-viewer',
  template: `
    <div #sceneContainer class="aframe-container" [ngStyle]="containerStyle">
    </div>
  `
})
export class AngularAFrameModelViewerComponent implements AfterViewInit {
  @Input() modelUrl: string = '';
  @ViewChild('sceneContainer', { static: true }) sceneContainer!: ElementRef;

  private sceneId: string;

  containerStyle = {
    border: '2px solid #00ff00',
    boxShadow: '0 0 10px #00ff00',
    height: '300px',
    width: '100%'
  };

  constructor() {
    this.sceneId = `angular-aframe-scene-${Math.random().toString(36).substr(2, 9)}`;
  }

  ngAfterViewInit() {
    this.initScene();
  }

  initScene() {
    const scene = document.createElement('a-scene');
    scene.id = this.sceneId;
    scene.setAttribute('embedded', '');
    
    const entity = document.createElement('a-entity');
    entity.setAttribute('gltf-model', this.modelUrl);
    entity.setAttribute('position', '0 0 -6');
    entity.setAttribute('rotation', '0 0 0');
    entity.setAttribute('scale', '0.1 0.1 0.1');
    
    const camera = document.createElement('a-camera');
    const sky = document.createElement('a-sky');
    sky.setAttribute('color', '#0a0a0a');
    
    scene.appendChild(entity);
    scene.appendChild(camera);
    scene.appendChild(sky);
    
    this.sceneContainer.nativeElement.appendChild(scene);
  }

  ngOnDestroy() {
    const scene = document.getElementById(this.sceneId);
    if (scene && scene.parentNode) {
      scene.parentNode.removeChild(scene);
    }
  }
}