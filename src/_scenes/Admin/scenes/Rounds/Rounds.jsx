import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

import { withNamespaces } from 'react-i18next';
import { Button, Card, CardHeader, CardBody, Table } from 'reactstrap';

import { alertActions } from '../../../../_actions/alert.actions'
import { modalActions } from '../../../../_actions/modal.actions'
import { roundActions } from '../../../../_actions/round.actions'
import { competitionActions } from '../../../../_actions/competition.actions'

import { LoadingView } from '../../../../_components';
import { TableBody } from '../../../../_components/Tables/TableBody';
import { TableHeadings } from '../../../../_components/Tables'

export default class Rounds extends Component {
  static propTypes = {
    clearAlerts: PropTypes.func.isRequired,
    deleteRound: PropTypes.func.isRequired,
    getAllRounds: PropTypes.func.isRequired,
    hideModal: PropTypes.func.isRequired,
    showModal: PropTypes.func.isRequired,
    rounds: PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.handleDeleteRound = this.handleDeleteRound.bind(this)
  }

  componentDidMount() {
    this.props.getAllRounds();

  }

  handleDeleteRound(id) {
    return this.props.deleteRound(id);
  }

  render() {
    const { showModal, t, rounds } = this.props
    console.log(this.props)
    const handleDeleteRound = this.handleDeleteRound
    const isLoading = this.props.rounds.loading
    const newRound = {
      attributes: {
        name: '',
        nameEn: '',
        abbreviation: '',
        flag: '',
        photo: ''
      },
      type: 'round'
    }

    const tableHeadingNames = [
      '#',
      t('admin.roundsTable.roundName'),
      t('admin.roundsTable.roundNameEn'),
      t('admin.roundsTable.abbreviation'),
      t('admin.roundsTable.flag'),
      t('shared.action')
    ]

    return(
      <Card className="card__form">
        <CardHeader 
          className="card__form__header"
        >
          <h2 className="card__form__title">{t('admin.roundsTable.title')}</h2>
        </CardHeader>
        <CardBody>
          {
            isLoading
            ? <LoadingView
                perPage={10}
              />
            : rounds.items.map((item) => (
                <p>{item.attributes.name}</p>
              ))
          }
        </CardBody>
      </Card>
    )
  }
}

function mapStateToProps(state) {
  const { rounds } = state;
  return {
    rounds
  };
}

const mapDispatchToProps = dispatch => ({
  clearAlerts: () => dispatch(alertActions.clear()),
  deleteRound: (id) => dispatch(roundActions.delete(id)),
  getAllRounds: () => dispatch(competitionActions.getAll( { include: 'rounds' } )),
  hideModal: () => dispatch(modalActions.hideModal()),
  showModal: (modalProps, modalType) => {
    dispatch(modalActions.showModal(modalProps, modalType ))
  }
})

const connectedRounds = connect(mapStateToProps, mapDispatchToProps)(Rounds);
const translatedRounds = withNamespaces()(connectedRounds)

export { translatedRounds as Rounds }; 
