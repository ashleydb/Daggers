import React from 'react';

// Renders a placeholder animation for lazy loading of images, etc.
// From https://github.com/jasonslyvia/react-lazyload/blob/master/examples/components/Placeholder.js
export default function Placeholder() {
  return (
    <div className="placeholder">
      <div className="spinner">
        <div className="rect1"></div>
        <div className="rect2"></div>
        <div className="rect3"></div>
        <div className="rect4"></div>
        <div className="rect5"></div>
      </div>
    </div>
  );
}
