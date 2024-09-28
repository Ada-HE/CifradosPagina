// ManejoErrores.js
import React from 'react';

function ManejoErrores({ error, success }) {
    return (
        <div>
            {error && <div className="error">{error}</div>}
            {success && <div className="success">{success}</div>}
        </div>
    );
}

export default ManejoErrores;
