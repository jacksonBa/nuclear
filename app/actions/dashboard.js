import {
  getBestNewAlbums,
  getBestNewTracks
} from 'pitchfork-bnm';

import {
  getTopTags
} from '../rest/Lastfm';

import {
  getNewsIndex,
  getNewsItem
} from '../rest/Nuclear';

export const LOAD_BEST_NEW_ALBUMS_START = 'LOAD_BEST_NEW_ALBUMS_START';
export const LOAD_BEST_NEW_ALBUMS_SUCCESS = 'LOAD_BEST_NEW_ALBUMS_SUCCESS';
export const LOAD_BEST_NEW_ALBUMS_ERROR = 'LOAD_BEST_NEW_ALBUMS_ERROR';

export const LOAD_BEST_NEW_TRACKS_START = 'LOAD_BEST_NEW_TRACKS_START';
export const LOAD_BEST_NEW_TRACKS_SUCCESS = 'LOAD_BEST_NEW_TRACKS_SUCCESS';
export const LOAD_BEST_NEW_TRACKS_ERROR = 'LOAD_BEST_NEW_TRACKS_ERROR';

export const LOAD_NUCLEAR_NEWS_START = 'LOAD_NUCLEAR_NEWS_START';
export const LOAD_NUCLEAR_NEWS_SUCCESS = 'LOAD_NUCLEAR_NEWS_SUCCESS';
export const LOAD_NUCLEAR_NEWS_ERROR = 'LOAD_NUCLEAR_NEWS_ERROR';

export const LOAD_TOP_TAGS_START = 'LOAD_TOP_TAGS_START';
export const LOAD_TOP_TAGS_SUCCESS = 'LOAD_TOP_TAGS_SUCCESS';
export const LOAD_TOP_TAGS_ERROR = 'LOAD_TOP_TAGS_ERROR';

export function loadTopTagsStart() {
  return {
    type: LOAD_TOP_TAGS_START
  };
}

export function loadTopTagsSuccess(tags) {
  return {
    type: LOAD_TOP_TAGS_SUCCESS,
    payload: tags
  };
}

export function loadTopTagsError() {
  return {
    type: LOAD_TOP_TAGS_ERROR
  };
}

export function loadTopTags() {
  return dispatch => {
    dispatch(loadTopTagsStart());
    getTopTags()
      .then(response => response.json())
      .then(results => {
	dispatch(loadTopTagsSuccess(results.toptags.tag));
      })
      .catch(error => {
	dispatch(loadTopTagsError(error));
	console.error(error);
      });
  };
}

export function loadBestNewAlbumsStart() {
  return {
    type: LOAD_BEST_NEW_ALBUMS_START
  };
}

export function loadBestNewAlbumsSuccess(albums) {
  return {
    type: LOAD_BEST_NEW_ALBUMS_SUCCESS,
    payload: albums
  };
}

export function loadBestNewAlbumsError() {
  return {
    type: LOAD_BEST_NEW_ALBUMS_ERROR
  };
}

export function loadBestNewAlbums() {
  return dispatch => {
    dispatch(loadBestNewAlbumsStart());
    getBestNewAlbums().
      then(albums => {
	dispatch(loadBestNewAlbumsSuccess(albums));
      })
      .catch(error => {
	dispatch(loadBestNewAlbumsError());
	console.error(error);
      });
  };  
}

export function loadBestNewTracksStart() {
  return {
    type: LOAD_BEST_NEW_TRACKS_START
  };
}

export function loadBestNewTracksSuccess(tracks) {
  return {
    type: LOAD_BEST_NEW_TRACKS_SUCCESS,
    payload: tracks
  };
}

export function loadBestNewTracksError() {
  return {
    type: LOAD_BEST_NEW_TRACKS_ERROR
  };
}

export function loadBestNewTracks() {
  return dispatch => {
    dispatch(loadBestNewAlbumsStart());
    getBestNewTracks().
      then(tracks => {
	dispatch(loadBestNewTracksSuccess(tracks));
      })
      .catch(error => {
	dispatch(loadBestNewTracksError());
	console.error(error);
      });
  };
}

export function loadNuclearNewsStart() {
  return {
    type: LOAD_NUCLEAR_NEWS_START
  };
}

export function loadNuclearNewsSuccess(news) {
  return {
    type: LOAD_NUCLEAR_NEWS_SUCCESS,
    payload: news
  };
}

export function loadNuclearNewsError() {
  return {
    type: LOAD_NUCLEAR_NEWS_ERROR
  };
}

export function loadNuclearNews() {
  return dispatch => {
    dispatch(loadNuclearNewsStart());
    getNewsIndex()
      .then(index => {
	return Promise.all(index.articles.map((item, i) => {
	  return getNewsItem(item);
	}));
      })
      .then(articles => {
	dispatch(loadNuclearNewsSuccess(articles));
      })
      .catch(err => {
	dispatch(loadNuclearNewsError(err));
      });
  };
}
