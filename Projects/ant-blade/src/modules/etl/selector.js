import _ from 'lodash';

export const etlStatusSelector = state => _.get(state, 'etlStatus.isRunning');
