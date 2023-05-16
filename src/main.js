import FiltersView from './view/filter.js';
import { render } from './framework/render.js';
import PointsModel from './model/point-model.js';
import BoardPresenter from './presenter/presenter-board.js';
import SiteMenuView from './view/menu_view.js';
import { getPoints, getDestinations, getOffersByType } from './mock/points.js';
import { generateFilter } from '../src/mock/filter.js';

const siteHeaderElement = document.querySelector('.trip-main');
const siteMainElement = document.querySelector('.page-main');

const points = getPoints();
const offersByType = getOffersByType();
const destinations = getDestinations();

const pointsModel = new PointsModel();
pointsModel.init(points, destinations, offersByType);
const boardPresenter = new BoardPresenter(siteMainElement.querySelector('.trip-events'), pointsModel);
boardPresenter.init();

const filters = generateFilter(pointsModel.points);

render(new FiltersView({ filters }), siteHeaderElement.querySelector('.trip-controls__filters'));
render(new SiteMenuView(), siteHeaderElement.querySelector('.trip-controls__navigation'));

