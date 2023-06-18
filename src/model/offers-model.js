import Obserbvable from '../framework/observable.js';
import { UpdateType } from '../utils/const.js';

export default class OffersModel extends Obserbvable {
  #offers = [];
  #pointsApiService = null;

  constructor(pointsApiService) {
    super();
    this.#pointsApiService = pointsApiService;
  }

  init = async () => {
    try {
      this.#offers = await this.#pointsApiService.offers;
    } catch (err) {
      this.#offers = [];
    }

    this._notify(UpdateType.INIT);
  };

  get offers() { return this.#offers; }
}
