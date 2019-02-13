import React from 'react'
import { Table } from 'reactstrap';
import PropTypes from 'prop-types'
import { Card, CardHeader, CardBody } from 'reactstrap';
import styles from './Competitions.module.css'
import { CompetitionsTableRow } from './CompetitionsTableRow'
import { withNamespaces } from 'react-i18next';

CompetitionsTable.propTypes = {
  competitions: PropTypes.object.isRequired,
  handleDeleteCompetition: PropTypes.func.isRequired
}

CompetitionsTable.defaultProps = {
  competitions: {}
}

function CompetitionsTable({ competitions, t }) {
  return (
    <Card className="card__form">
      <CardHeader tag="h2">
        {t('admin.competitionsTable.title')}
      </CardHeader>
      <CardBody>
        <Table
            className={styles.table__competitions}
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
                  key={competition.id}
                  index={index}
                  competition={competition}
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