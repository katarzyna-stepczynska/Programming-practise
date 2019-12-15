import React from 'react';
import './App.css';
// import axios from 'axios';
import unsplash from './api/unsplash';
import ImageList from './components/ImageList';

import SearchBar from './components/SearchBar';

class App extends React.Component {
  state = { images: [] };
  onSearchSubmit = async (term) => {
    console.log(term);
    const response = await unsplash.get('/search/photos', {
      params: { query: term },
    });
    // .then(response=> {
    //   console.log(response.data.results);
    // });
    console.log(response.data.results);
    console.log(this);
    this.setState({ images: response.data.results });
  }
  render() {
    return (
    <div className="ui container" style = {{ marginTop: '10px' }}>
      <SearchBar onSubmit={this.onSearchSubmit} />
      <ImageList images={this.state.images} />
      Found: {this.state.images.length} images
    </div>
  );

  }
}

export default App;
