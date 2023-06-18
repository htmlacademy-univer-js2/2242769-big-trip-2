import TripEventsPresenter from './presenter/presenter-board.js';
import SiteMenuPresenter from './presenter/site-menu-presenter.js';
import PointsModel from './model/points-model.js';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destinations-model.js';
import FilterModel from './model/filters-model.js';
import PointsApiService from './api/api-service.js';

const AUTHORIZATION = 'Basic fiyq9ygu56Qz3sdajhl35hvm';
const END_POINT = 'https://18.ecmascript.pages.academy/big-trip/';

const siteHeaderElement = document.querySelector('.trip-main');
const siteMainElement = document.querySelector('.trip-events');

const apiService = new PointsApiService(END_POINT, AUTHORIZATION);

const pointsModel = new PointsModel(apiService);
const offersModel = new OffersModel(apiService);
const destinationsModel = new DestinationsModel(apiService);
const filtersModel = new FilterModel();
const newEventButtonComponent = siteHeaderElement.querySelector('.trip-main__event-add-btn');

const headerPresenter = new SiteMenuPresenter(siteHeaderElement, siteHeaderElement.querySelector('.trip-controls__filters'),
  filtersModel, pointsModel, offersModel, destinationsModel);
const tripPresenter = new TripEventsPresenter(siteMainElement, pointsModel,
  offersModel, destinationsModel, filtersModel);

const handleNewFormClose = () => {
  newEventButtonComponent.disabled = false;
};

const handleNewEventButtonClick = () => {
  tripPresenter.createNewForm(handleNewFormClose);
  newEventButtonComponent.disabled = true;
};

tripPresenter.init();
headerPresenter.init();

offersModel.init().finally(() => {
  destinationsModel.init().finally(() => {
    pointsModel.init().finally(() => {
      newEventButtonComponent.addEventListener('click', handleNewEventButtonClick);
    });
  });
});
