import ScrollToTop from './ScrollToTop';
import {
  useNavigate, useParams, useLocation
} from 'react-router-dom';

function withNavigation(Component) {
  return props => <Component {...props} navigate={useNavigate()} />;
}

function withParams(Component) {
  return props => <Component {...props} params={useParams()} />;
}

function withLocation(Component) {
  return props => <Component {...props} location={useLocation()} />;
}

export {
  ScrollToTop,
  withNavigation,
  withParams,
  withLocation,
}
