import _ from "lodash";
import axios from 'axios';

export const defaults = {
  url: '',
  method: 'GET',
  data: undefined,
  preLoad: _.noop,
  postLoad: _.noop
};

export const requestConfigKeys = [
  'url',
  'method',
  'data',
  'timeout',
  'headers',
  'withCredentials',
  'params',
  'responseType'
];

export const request = (opts) => {
  let config = _.assign({}, defaults, opts);
  const requestConfig = _.assign({}, _.pick(config, requestConfigKeys));

  function preLoad() {
    // TODO: create global spinner for drop in -- might need global wrapper

    // if (config.useInlineSpinner && !_.isEmpty(config.inlineSpinnerId)) {
    //   store.dispatch(setInlineSpinner(config.inlineSpinnerId, true));
    // } else if (config.useSpinner) {
    //   store.dispatch(setGlobalSpinner(true));
    // }
    config.preLoad();
  }

  function postLoad(data = null) {
    config.postLoad(data);

    // TODO: global spinner -- see above
    // if (config.useInlineSpinner && !_.isEmpty(config.inlineSpinnerId)) {
    //   store.dispatch(setInlineSpinner(config.inlineSpinnerId, false));
    // } else if (config.useSpinner) {
    //   store.dispatch(setGlobalSpinner(false));
    // }
  }

  preLoad();

  axios(requestConfig)
  .then(response => {
    const {data} = response;

    postLoad(data);

    return data;
  })
  .catch(error => {
    postLoad(error);

    // TODO: global spinner -- see above
    // if (config.useInlineSpinner && !_.isEmpty(config.inlineSpinnerId)) {
    //   store.dispatch(setInlineSpinner(config.inlineSpinnerId, false));
    // } else if (config.useSpinner) {
    //   store.dispatch(setGlobalSpinner(false));
    // }

    return error;
  });
}
