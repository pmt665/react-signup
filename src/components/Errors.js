import React from 'react';
import { array } from 'prop-types';

const Errors = ({ errors }) =>
    errors.length > 0 && (
        <div>
            <div>
                {errors.map((error, index) => (
                    <p className= 'error' key={`error-${index}`}>{error}</p>
                ))}
            </div>
        </div>
    );

Errors.propTypes = {
    errors: array
};

Errors.defaultProps = {
    errors: []
};

export default Errors;