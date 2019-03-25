import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

import moment from 'moment'
import { withNamespaces } from 'react-i18next';
import { Button, Card, CardHeader, CardBody, Table } from 'reactstrap';

import { alertActions } from '../../../../_actions/alert.actions'
import { competitionActions } from '../../../../_actions/competition.actions'
import { modalActions } from '../../../../_actions/modal.actions'
import { teamActions } from '../../../../_actions/team.actions'

import { TableHeadings } from '../../../../_components/Tables'
import { formattingDateTime } from '../../../../_helpers'
import TableBody from '../../../../_components/Tables/TableBody';

export default class Competitions extends Component {
  static propTypes = {
    clearAlerts: PropTypes.func.isRequired,
    competitions: PropTypes.object,
    deleteCompetition: PropTypes.func.isRequired,
    getAllCompetitions:PropTypes.func.isRequired,
    getAllTeams: PropTypes.func.isRequired,
    hideModal: PropTypes.func.isRequired,
    showModal: PropTypes.func.isRequired,
    teams: PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.handleDeleteCompetition = this.handleDeleteCompetition.bind(this)
  }

  componentDidMount() {
    this.props.getAllCompetitions();
    this.props.getAllTeams();
  }

  closeModal = event => {
    this.props.hideModal()
    this.props.clearAlerts()
  }

  handleDeleteCompetition(id) {
    return this.props.deleteCompetition(id);
  }

  render() {
    const { competitions, showModal, t } = this.props
    const closeModal = this.closeModal
    const dateNow = formattingDateTime.toIsoFormat(moment())
    const handleDeleteCompetition = this.handleDeleteCompetition
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
    const tableHeadingNames = [
      '#',
      t('admin.competitionsTable.competitionName'),
      t('admin.competitionsTable.place'),
      t('admin.competitionsTable.year'),
      t('admin.competitionsTable.startDate'),
      t('admin.competitionsTable.endDate'),
      t('admin.competitionsTable.winner'),
      t('shared.action')
    ]

    return (
      <div>
        <Button
          onClick={() =>
            showModal(
              {
                closeModal: closeModal,
                item: newCompetition, 
                isEditing: false,
                open: true,
                title: 'Competition form'
              },
              'form'
            )
          }
        > 
          {t('admin.competitionsTable.addNewCompetition')}
        </Button>        
        <Card className="card__form">
          <CardHeader tag="h2">
            {t('admin.competitionsTable.title')}
          </CardHeader>
          <CardBody>
            <Table responsive>
              <TableHeadings 
                tableHeadingNames={tableHeadingNames}
              />
              <TableBody
                closeModal={closeModal}
                handleDeleteItem={handleDeleteCompetition}
                items={competitions.items}
                showModal={showModal}
                title={'Competition form'}
              />
            </Table>
          </CardBody>
        </Card>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { competitions, teams } = state;
  return {
    competitions,
    teams
  };
}

const mapDispatchToProps = dispatch => ({
  clearAlerts: () => dispatch(alertActions.clear()),
  deleteCompetition: (id) => dispatch(competitionActions.delete(id)),
  getAllCompetitions: (currentPage, perPage) => dispatch(competitionActions.getAll(currentPage, perPage)),
  getAllTeams: () => dispatch(teamActions.getAll(null, null, true)),
  hideModal: () => dispatch(modalActions.hideModal()),
  showModal: (modalProps, modalType) => {
    dispatch(modalActions.showModal(modalProps, modalType ))
  }
})

const connectedCompetitions = connect(mapStateToProps, mapDispatchToProps)(Competitions);
const translatedCompetitions = withNamespaces()(connectedCompetitions)

export { translatedCompetitions as Competitions }; 
