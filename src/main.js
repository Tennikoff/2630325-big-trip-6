import BoardPresenter from './presenter/board-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointsModel from './model/points-model.js';

const tripControlsFilters = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');

const pointsModel = new PointsModel();

const filterPresenter = new FilterPresenter({
  container: tripControlsFilters,
  pointsModel,
});

const boardPresenter = new BoardPresenter({
  container: tripEventsContainer,
  pointsModel,
});

filterPresenter.init();
boardPresenter.init();
