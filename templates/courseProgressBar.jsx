import Adapt from 'core/js/adapt';
import React from 'react';

export default function CourseProgressBar(props) {
  return (
    <div className='course-progress__inner'>
      <div role="progressbar" className='course-progress__bar js-indicator-bar' style={{ width: props.percentageComplete + '%' }}
        aria-valuenow={props.percentageComplete} aria-valuemin={0} aria-valuemax={100}></div>
    </div>
  );
}
