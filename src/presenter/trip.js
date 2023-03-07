import TripList from '../view/trip-list.js';
import PointView from '../view/point.js';
import NewPointView from '../view/point-new';
import PointEditView from '../view/point-edit';
import SortView from '../view/sort.js';
import { render, RenderPosition } from '../render.js';

export default class TripEventsPresenter {
  constructor() {
    this.component = new TripList();
  }

  init(container) {
    this.container = container;

    render(new SortView(), this.container, RenderPosition.BEFOREEND);
    render(this.component, this.container);
    render(new PointEditView(), this.component.getElement(), RenderPosition.BEFOREEND);
    render(new NewPointView(), this.component.getElement(), RenderPosition.BEFOREEND);

    for (let i = 0; i < 3; i++) {
      render(new PointView(), this.component.getElement(), RenderPosition.BEFOREEND);
    }

  }
}
