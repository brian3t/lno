/**
 * Dynamic content view. Able to show an arbitrary view
 * Pass in a jsx to render
 */
import React from 'react';
import {Page} from 'framework7-react'
import './Today.less';

const Dynamic = ({jsx}) => {
  return (
    <Page>Dynamic here, showing {jsx}</Page>
  );
}

export default Dynamic;
