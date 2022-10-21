import Adapt from 'core/js/adapt';
import CourseProgressBarView from './courseProgressBarView';

class CourseProgressBar extends Backbone.Controller {

  initialize() {
    Adapt.on('navigationView:postRender', this.setUpProgressBar);
  }

  setUpProgressBar(navView) {
    if (!Adapt.course?.get('_courseProgressBar')?._isEnabled) return;
    const model = new Backbone.Model({
      percentageComplete: 0
    });
    model.models = new Backbone.Collection(Adapt.components.models.filter((compModel) => {
      return compModel.get('_isAvailable') && !compModel.get('_isOptional');
    }));
    model.getCompletionPercentage = function () {
      const total = this.models.length;
      const completed = this.models.filter((compModel) => {
        return compModel.get('_isComplete');
      }).length;
      const percentage = Math.round((completed / total) * 100);
      this.set('percentageComplete', percentage);
      return percentage;
    };

    navView.$el.append(new CourseProgressBarView({ model }).$el);
  }

}

export default new CourseProgressBar();
