import React from 'react';
import {getFunName} from '../helpers';

class StorePicker extends React.Component {

    myInput = React.createRef();

    // property set to an arrow function
    // allows to bind the value
    goToStore = (event) => {
        // Stop the form from submitting
        event.preventDefault();
        // get the text from that input
        const storeName = this.myInput.current.value;
        //  3. change the location page to /store/any-other-value
        this.props.history.push(`/store/${storeName}`);
    }


    render(){
        return (
            <form className="store-selector" onSubmit={this.goToStore}>
                <h2> Please enter a Store</h2>
                <input type="text" ref={this.myInput} 
                required placeholder="Store Name"
                defaultValue={getFunName()} />
                <button type="submit">Visit Store -> </button>
            </form>
        )
    }
}

export default StorePicker;