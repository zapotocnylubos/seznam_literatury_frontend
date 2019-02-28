import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { ApplicationState } from "./store";
import { Dispatch } from "redux";
import { fetchRequest } from "./store/literature-set/actions";
import { connect } from 'react-redux'
import { LiteratureSetState } from "./store/literature-set/types";
import { LiteratureSet } from "./types/literature-set";

interface PropsFromState {
    loading: boolean
    data: LiteratureSet | null
    errors?: string
}

interface PropsFromDispatch {
    fetchRequest: typeof fetchRequest
}

type AllProps = PropsFromState & PropsFromDispatch


class App extends Component<AllProps>{

    public componentDidMount() {
        const {data} = this.props;

        if (!data) {
            this.props.fetchRequest()
        }
    }

    render() {
        return (
            <div>
                {this.props.loading && "Loading"}
                {this.props.data && JSON.stringify(this.props.data)}
            </div>

        );
    }
}

const mapStateToProps = ({literatureSet}: ApplicationState) => ({
    loading: literatureSet.loading,
    errors: literatureSet.errors,
    data: literatureSet.data
});

// mapDispatchToProps is especially useful for constraining our actions to the connected component.
// You can access these via `this.props`.
const mapDispatchToProps = (dispatch: Dispatch) => ({
    fetchRequest: () => dispatch(fetchRequest())
});

// Now let's connect our component!
// With redux v4's improved typings, we can finally omit generics here.
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)