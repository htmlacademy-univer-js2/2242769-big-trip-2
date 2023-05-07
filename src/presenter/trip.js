import TripList from '../view/trip-list.js';
import PointView from '../view/point.js';
import EditingPointView from '../view/point-edit.js';
import SortView from '../view/sort.js';
import { render, replace } from '../framework/render.js';


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

    render(new SortView(), this.#tripContainer);
    render(this.#eventsList, this.#tripContainer);

    for (const point of this.#boardPoints) {
      this.#renderPoint(point);
    }
  }

  #renderPoint = (point) => {

    const pointComponent = new PointView(point, this.#destinations, this.#offers);
    const editComponent = new EditingPointView(point, this.#destinations, this.#offers);

    const turnPointToEdit = () => {
      replace(
        editComponent, pointComponent
      );
    };

    const turnPointToView = () => {
      replace(
        pointComponent, editComponent
      );
    };
    const onEscKeyUp = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        turnPointToView();

        document.removeEventListener('keyup', onEscKeyUp);
      }
    };

    pointComponent.setEditClickHandler(() => {
      turnPointToEdit();
      document.addEventListener('keyup', onEscKeyUp);
    });

    editComponent.setPreviewClickHandler(() => {
      turnPointToView();
      document.removeEventListener('keyup', onEscKeyUp);
    });

    editComponent.setFormSubmitHandler(() => {
      turnPointToView();
      document.removeEventListener('keydown', onEscKeyUp);
    });
    render(pointComponent, this.#eventsList.element);
  }
}
