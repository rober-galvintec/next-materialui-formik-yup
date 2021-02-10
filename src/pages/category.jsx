// Vendor libs
import React from 'react';

// Material-UI components
import Container from '@material-ui/core/Container';

// Data
const category = require('../data/category.json');

// Component definition
const CategoryPage = () => {
  console.log(category);

  return (
    <>
      <h3>Category edit</h3>
    </>
  );
};

// Exportation
export default CategoryPage;
