import PropTypes from 'prop-types';

import './InterestPhoto.scss';

const InterestPhoto = ({ image }) => (
  <div className="interest">
    <img clasName="interest__img" src={image} alt="product" />
  </div>
);

InterestPhoto.propTypes = {
  image: PropTypes.string.isRequired,
};

export default InterestPhoto;