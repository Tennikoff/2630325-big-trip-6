import { filter } from '../utils.js';
import { FilterType } from '../const.js';

function generateFilters(points) {
  return Object.values(FilterType).map((type) => ({
    type,
    count: filter[type](points).length,
  }));
}

export { generateFilters };
