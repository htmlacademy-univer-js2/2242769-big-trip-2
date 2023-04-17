import FiltersView from './view/filter.js';
import TripEventsPresenter from './presenter/trip.js';
import PointsModel from './model/point-model.js';
import { getPoints, getDestinations, getOffersByType } from './mock/points';


const siteHeaderElement = document.querySelector('.trip-main');
const siteMainElement = document.querySelector('.page-main');
const tripPresenter = new TripEventsPresenter(siteMainElement.querySelector('.trip-events'));

const points = getPoints();
const offersByType = getOffersByType();
const destinations = getDestinations();

const pointsModel = new PointsModel();
pointsModel.init(points, destinations, offersByType);
tripPresenter.init(pointsModel);

const filters = generateFilter(pointsModel.points);

render(new FiltersView({ filters }), siteHeaderElement.querySelector('.trip-controls__filters'));


