import FilterView from './view/filter.js';
import TripEventsPresenter from './presenter/trip.js';
import { render, RenderPosition } from './render.js';

const filterContainer = document.querySelector('.trip-main');
const tripContainer = document.querySelector('.trip-events');
const tripPresenter = new TripEventsPresenter();

render(new FilterView(), filterContainer.querySelector('.trip-controls__filters'), RenderPosition.BEFOREEND);

tripPresenter.init(tripContainer);
