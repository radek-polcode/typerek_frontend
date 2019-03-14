import React from 'react'
import { Table } from 'reactstrap';
import PropTypes from 'prop-types'
import { Card, CardHeader, CardBody } from 'reactstrap';
import { CompetitionsTableRow } from './CompetitionsTableRow'
import { withNamespaces } from 'react-i18next';

CompetitionsTable.propTypes = {
  competitions: PropTypes.object.isRequired,
  handleDeleteCompetition: PropTypes.func.isRequired
}

CompetitionsTable.defaultProps = {
  competitions: {}
}

function CompetitionsTable({ competitions, handleDeleteCompetition, t }) {
  return (
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
                />
              )}
            </tbody>
        </Table>
      </CardBody>
    </Card>
  )
}
const translatedComponent = withNamespaces()(CompetitionsTable)
export { translatedComponent as CompetitionsTable }