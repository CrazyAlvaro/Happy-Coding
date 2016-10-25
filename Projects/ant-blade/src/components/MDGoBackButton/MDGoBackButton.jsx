import React, { PropTypes } from 'react';
import { withRouter } from 'react-router';

const MDGoBackButton = (props) => (
  <div>
    <div
      type="button"
      className="btn btn-secondary"
      style={{ border: '1px solid #ddd', marginBottom: 20 }}
      onClick={props.router.goBack}
    >
      返回
    </div>
  </div>
);

MDGoBackButton.propTypes = {
  router: PropTypes.object,
};

export default withRouter(MDGoBackButton);
