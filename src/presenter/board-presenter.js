import SortView from '../view/sort-view.js';
import EventListView from '../view/event-list-view.js';
import EventView from '../view/event-view.js';
import EventEditView from '../view/event-edit-view.js';
import NoPointView from '../view/no-point-view.js';
import { render, replace } from '../framework/render.js';
import { FilterType } from '../const.js';

export default class BoardPresenter {
  #container = null;
  #pointsModel = null;
  #eventListComponent = new EventListView();

  constructor({ container, pointsModel }) {
    this.#container = container;
    this.#pointsModel = pointsModel;
  }

  init() {
    const points = this.#pointsModel.points;
    const offers = this.#pointsModel.offers;
    const destinations = this.#pointsModel.destinations;

    if (points.length === 0) {
      render(new NoPointView({ filterType: FilterType.EVERYTHING }), this.#container);
      return;
    }

    render(new SortView(), this.#container);
    render(this.#eventListComponent, this.#container);

    for (let i = 0; i < points.length; i++) {
      this.#renderPoint(points[i], offers, destinations);
    }
  }

  #renderPoint(point, offers, destinations) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToPoint();
      }
    };

    const eventComponent = new EventView({
      point,
      offers,
      destinations,
      onEditClick: () => {
        replacePointToForm();
      },
    });

    const eventEditComponent = new EventEditView({
      point,
      offers,
      destinations,
      onFormSubmit: () => {
        replaceFormToPoint();
      },
      onCloseClick: () => {
        replaceFormToPoint();
      },
    });

    function replacePointToForm() {
      replace(eventEditComponent, eventComponent);
      document.addEventListener('keydown', escKeyDownHandler);
    }

    function replaceFormToPoint() {
      replace(eventComponent, eventEditComponent);
      document.removeEventListener('keydown', escKeyDownHandler);
    }

    render(eventComponent, this.#eventListComponent.element);
  }
}
