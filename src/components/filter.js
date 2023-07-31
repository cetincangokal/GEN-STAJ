
import React from 'react';

const Filter = ({ handleFilter }) => {
  return (
    <div style={{ marginBottom: '10px' }}>
      <input
        type="text"
        placeholder="Search by name..."
        onChange={(e) => handleFilter(e.target.value)}
      />
    </div>
  );
};

export default Filter;
