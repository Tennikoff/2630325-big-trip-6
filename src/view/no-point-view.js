import AbstractView from '../framework/view/abstract-view.js';
import { NoPointMessage } from '../const.js';

function createNoPointTemplate(filterType) {
  return `<p class="trip-events__msg">${NoPointMessage[filterType]}</p>`;
}

export default class NoPointView extends AbstractView {
  #filterType = null;

  constructor({ filterType }) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createNoPointTemplate(this.#filterType);
  }
}
