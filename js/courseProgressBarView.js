import Adapt from 'core/js/adapt';
import { templates } from 'core/js/reactHelpers';
import React from 'react';
import ReactDOM from 'react-dom';

export default class CourseProgressBarView extends Backbone.View {

  get className() {
    return [
      'course-progress'
    ];
  }

  get template() {
    return 'courseProgressBar.jsx';
  }

  initialize(options) {
    this.listenTo(this.model.models, 'change:_isComplete', this.updateProgress);
    this.render();
  }

  render() {
    const data = this.model.toJSON();
    const Template = templates[this.template.replace('.jsx', '')];
    ReactDOM.render(<Template {...data} />, this.el);
    return this;
  }

  updateProgress() {
    const percentage = this.model.getCompletionPercentage();
    this.$('.js-indicator-bar').animate({ width: `${percentage}%` }, 1000);
    this.$('.js-indicator-bar').attr('aria-valuenow', percentage);
  }

}
