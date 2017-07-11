import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { getSuggestionValue, renderSuggestion } from '../../helpers/TagAutosuggestHelper';
import s from './RestaurantAddTagForm.scss';

// eslint-disable-next-line css-modules/no-unused-class
import autosuggestTheme from './RestaurantAddTagFormAutosuggest.scss';

const returnTrue = () => true;

// eslint-disable-next-line css-modules/no-undef-class
autosuggestTheme.input = 'form-control input-sm';

export class _RestaurantAddTagForm extends Component {
  componentDidMount() {
    this.autosuggest.input.focus();
  }

  render() {
    return (
      <form className={s.root} onSubmit={this.props.addNewTagToRestaurant}>
        <Autosuggest
          suggestions={this.props.tags}
          focusInputOnSuggestionClick={false}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={{
            value: this.props.autosuggestValue,
            onChange: this.props.setAddTagAutosuggestValue,
          }}
          theme={autosuggestTheme}
          onSuggestionSelected={this.props.handleSuggestionSelected}
          onSuggestionsFetchRequested={() => {}}
          onSuggestionsClearRequested={() => {}}
          shouldRenderSuggestions={returnTrue}
          ref={a => { this.autosuggest = a; }}
        />
        <button
          className={`btn btn-sm btn-primary ${s.button}`}
          type="submit"
          disabled={this.props.autosuggestValue === ''}
        >
          add
        </button>
        <button
          className={`btn btn-sm btn-default ${s.button}`}
          type="button"
          onClick={this.props.hideAddTagForm}
        >
          done
        </button>
      </form>
    );
  }
}

_RestaurantAddTagForm.propTypes = {
  addNewTagToRestaurant: PropTypes.func.isRequired,
  handleSuggestionSelected: PropTypes.func.isRequired,
  hideAddTagForm: PropTypes.func.isRequired,
  autosuggestValue: PropTypes.string.isRequired,
  setAddTagAutosuggestValue: PropTypes.func.isRequired,
  tags: PropTypes.array.isRequired
};

export default withStyles(s)(withStyles(autosuggestTheme)(_RestaurantAddTagForm));
