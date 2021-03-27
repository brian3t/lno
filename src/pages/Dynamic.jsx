/**
 * Dynamic content view. Able to show an arbitrary view
 * Pass in a jsx to render
 */
import React from 'react';
import './Today.less';

const Dynamic = ({jsx}) => {
  return (
    <div>Dynamic here, showing {jsx}</div>
  );
}

export default Dynamic;
