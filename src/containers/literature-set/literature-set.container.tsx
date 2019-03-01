import React, { Component } from 'react';
import { ApplicationState } from "../../store";
import { connect } from "react-redux";
import { LiteratureSet } from "../../types/literature-set";
import Container from "react-bootstrap/Container";
import LiteratureGroupContainer from "../literature-group/literature-group.container";
import LiteratureSetHeaderContainer from "./literature-set-header.container";
import LiteratureSetFooterComponent from "../../components/literature-set-footer.component";

interface PropsFromState {
    loading: boolean
    data: LiteratureSet | null
    errors?: string
}

type AllProps = PropsFromState


class LiteratureSetContainer extends Component<AllProps> {
    render() {
        const {loading, data, errors} = this.props;
        return (
            <Container>
                {loading && "Načítání..."}
                {errors && "Nahrávání nebylo uspěšné"}
                {data && <>
                    <LiteratureSetHeaderContainer/>
                    <hr/>
                    {data.literature_groups.map((literatureGroup, index) =>
                        <LiteratureGroupContainer key={index} literatureGroup={literatureGroup}/>
                    )}
                    <hr/>
                    <LiteratureSetFooterComponent/>
                </>}
            </Container>
        )
    }
}

const mapStateToProps = ({literatureSet}: ApplicationState) => ({
    loading: literatureSet.loading,
    data: literatureSet.data,
    errors: literatureSet.errors,
});

export default connect(
    mapStateToProps
)(LiteratureSetContainer)