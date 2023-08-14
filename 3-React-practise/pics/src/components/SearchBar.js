import React from 'react';

class SearchBar extends React.Component {
    // onInputChange(e) {
    //     console.log(e.target.value);
    // }
    state = { term: '' };

    onFormSubmit = (e) => {
        e.preventDefault();
        console.log(this.state.term);
        this.props.onSubmit(this.state.term)
    }

    render() {
        return (
            <div className="ui segment">
                <form onSubmit={this.onFormSubmit} className="ui form">
                    <div className="field">
                        <label>Image search:</label>
                        <input type="text"
                        value={this.state.term} 
                        onChange={e => this.setState({ term: e.target.value })} />
                        {/* onChange={this.onInputChange} /> */}
                    </div>
                </form>
            </div>
        );
    }
}

export default SearchBar;