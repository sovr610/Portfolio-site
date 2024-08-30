import React, { useEffect, useRef } from 'react';

export const ReactAFrameModelViewer = ({ modelUrl }) => {
  const sceneId = useRef(`react-aframe-scene-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    const scene = document.getElementById(sceneId.current);
    
    if (typeof AFRAME !== 'undefined' && !AFRAME.components['model-viewer']) {
      AFRAME.registerComponent('model-viewer', {
        schema: {
          src: { type: 'string' }
        },
        init: function() {
          this.el.setAttribute('gltf-model', this.data.src);
        }
      });
    }

    return () => {
      if (scene && scene.parentNode) {
        scene.parentNode.removeChild(scene);
      }
    };
  }, []);

  const sceneStyle = {
    height: '300px',
    width: '100%'
  };

  return (
    <div className="aframe-container" style={{ border: '2px solid #00ff00', boxShadow: '0 0 10px #00ff00' }}>
      <a-scene id={sceneId.current} embedded style={sceneStyle}>
        <a-entity
          gltf-model={modelUrl}
          position="0 0 -6"
          rotation="0 0 0"
          scale="0.1 0.1 0.1"
        ></a-entity>
        <a-camera></a-camera>
        <a-sky color="#0a0a0a"></a-sky>
      </a-scene>
    </div>
  );
};