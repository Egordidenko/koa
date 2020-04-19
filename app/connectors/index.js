import mongooseConnector from './mongoose-connector';
import {MONGO_URI} from '../config';

/**
* It returns mongooseConnector
*/
function connectorsInit() {
  mongooseConnector(MONGO_URI);
}

export {
  mongooseConnector,
};

export default connectorsInit;
