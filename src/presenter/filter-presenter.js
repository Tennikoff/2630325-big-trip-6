import FilterView from '../view/filter-view.js';
import { render } from '../framework/render.js';
import { FilterType } from '../const.js';
import { generateFilters } from '../mock/filter.js';

export default class FilterPresenter {
  #container = null;
  #pointsModel = null;

  constructor({ container, pointsModel }) {
    this.#container = container;
    this.#pointsModel = pointsModel;
  }

  init() {
    const filters = generateFilters(this.#pointsModel.points);

    render(new FilterView({
      filters,
      currentFilter: FilterType.EVERYTHING,
    }), this.#container);
  }
}
