import TripList from '../view/trip-list.js';
import PointView from '../view/point.js';
import EditingPointView from '../view/point-edit.js';
import SortView from '../view/sort.js';
import { render } from '../render.js';
import EmptyListView from '../view/empty-list-view.js';

export default class TripEventsPresenter {
  #eventsList = null;
  #tripContainer = null;
  #pointsModel = null;
  #boardPoints = null;
  #destinations = null;
  #offers = null;

  constructor(tripContainer) {
    this.#eventsList = new TripList();
    this.#tripContainer = tripContainer;
  }

  init(pointsModel) {
    this.#pointsModel = pointsModel;
    this.#boardPoints = [...this.#pointsModel.points];
    this.#destinations = [...this.#pointsModel.destinations];
    this.#offers = [...this.#pointsModel.offers];

    if (this.#boardPoints.length === 0) {
      render(new EmptyListView(), this.#tripContainer);
    } else {
      render(new SortView(), this.#tripContainer);
      render(this.#eventsList, this.#tripContainer);
      for (const point of this.#boardPoints) {
        this.#renderPoint(point);
      }
    }
  }

  #renderPoint = (point) => {

    const pointComponent = new PointView(point, this.#destinations, this.#offers);
    const editComponent = new EditingPointView(point, this.#destinations, this.#offers);

    const turnPointToEdit = () => {
      this.#eventsList.element.replaceChild(
        editComponent.element,
        pointComponent.element
      );
    };

    const turnPointToView = () => {
      this.#eventsList.element.replaceChild(
        pointComponent.element,
        editComponent.element
      );
    };
    const onEscKeyup = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        turnPointToView();
        document.removeEventListener('keyup', onEscKeyup);
      }
    };

    pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      turnPointToEdit();
      document.addEventListener('keyup', onEscKeyup());
    });

    editComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      turnPointToView();
      document.removeEventListener('keyup', onEscKeyup());
    });

    editComponent.element.querySelector('.event--edit').addEventListener('submit', (evt) => {
      evt.preventDefault();
      turnPointToView();
      document.removeEventListener('keyup', onEscKeyup());
    });

    editComponent.element.querySelector('.event--edit').addEventListener('reset', (evt) => {
      evt.preventDefault();
      turnPointToView();
      document.removeEventListener('keyup', onEscKeyup());
    });

    render(pointComponent, this.#eventsList.element);
  }
}
