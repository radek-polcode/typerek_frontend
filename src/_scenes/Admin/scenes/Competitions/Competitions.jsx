import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

import moment from 'moment'
import { withNamespaces } from 'react-i18next';
import { Button, Card, CardHeader, CardBody, Table } from 'reactstrap';

import { alertActions } from '../../../../_actions/alert.actions'
import { modalActions } from '../../../../_actions/modal.actions'
import { competitionActions } from '../../../../_actions/competition.actions'

import { CompetitionsTableRow } from './CompetitionsTableRow'
import { formattingDateTime } from '../../../../_helpers'

export default class Competitions extends Component {
  static propTypes = {
  }

  constructor(props) {
    super(props)
    this.handleDeleteCompetition = this.handleDeleteCompetition.bind(this)
  }

  componentDidMount() {
    this.props.getAllCompetitions();
  }

  handleDeleteCompetition(id) {
    return this.props.deleteCompetition(id);
  }

  openFormModal = ({competition, isEditing}) => {
    this.props.showModal({
      closeModal: this.closeModal,
      isEditing: isEditing,
      open: true,
      entity: competition,
      title: 'Competition form',
    }, 'form')
  }

  closeModal = event => {
    this.props.hideModal()
    this.props.clearAlerts()
  }

  render() {
    const dateNow = formattingDateTime.toIsoFormat(moment())
    const { competitions, t } = this.props
    const handleDeleteCompetition = this.handleDeleteCompetition
    const openFormModal = this.openFormModal
    const newCompetition = {
      attributes: {
        end_date: dateNow,
        name: '',
        place: '',
        start_date: dateNow,
        winner_id: '',
        year: ''
      },
      type: 'competition'
    }

    return (
      <div>
        <Button
          onClick={() => openFormModal({competition: newCompetition, isEditing: false})}
        > 
          {t('admin.competitionsTable.addNewCompetition')}
        </Button>        
        <Card className="card__form">
          <CardHeader tag="h2">
            {t('admin.competitionsTable.title')}
          </CardHeader>
          <CardBody>
            <Table
                responsive
              >
                <thead>
                  <tr>
                    <th>#</th>
                    <th>{t('admin.competitionsTable.competitionName')}</th>
                    <th>{t('admin.competitionsTable.place')}</th>
                    <th>{t('admin.competitionsTable.year')}</th>
                    <th>{t('admin.competitionsTable.startDate')}</th>
                    <th>{t('admin.competitionsTable.endDate')}</th>
                    <th>{t('admin.competitionsTable.winner')}</th>
                    <th>{t('shared.action')}</th>
                  </tr>
                </thead>
                <tbody>
                  {competitions.items &&
                    competitions.items.map((competition, index) =>
                    <CompetitionsTableRow
                      competition={competition}
                      handleDeleteCompetition={handleDeleteCompetition}
                      index={index}
                      key={competition.id}
                      openFormModal={openFormModal}
                    />
                  )}
                </tbody>
            </Table>
          </CardBody>
        </Card>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { competitions } = state;
  return {
    competitions
  };
}

const mapDispatchToProps = dispatch => ({
  clearAlerts: () => dispatch(alertActions.clear()),
  deleteCompetition: (id) => dispatch(competitionActions.delete(id)),
  getAllCompetitions: (currentPage, perPage) => dispatch(competitionActions.getAll(currentPage, perPage)),
  hideModal: () => dispatch(modalActions.hideModal()),
  showModal: (modalProps, modalType) => {
    dispatch(modalActions.showModal(modalProps, modalType ))
  }
})

const connectedCompetitions = connect(mapStateToProps, mapDispatchToProps)(Competitions);
const translatedCompetitions = withNamespaces()(connectedCompetitions)

export { translatedCompetitions as Competitions }; 
