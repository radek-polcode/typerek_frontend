import React from 'react'
import { Table } from 'reactstrap';
import PropTypes from 'prop-types'
import { Card, CardHeader, CardBody } from 'reactstrap';
import { TeamsTableRow } from './TeamsTableRow'
import { withNamespaces } from 'react-i18next';

TeamsTable.propTypes = {
  teams: PropTypes.object.isRequired,
  handleDeleteTeam: PropTypes.func.isRequired
}

TeamsTable.defaultProps = {
  teams: {}
}

function TeamsTable({ teams, handleDeleteTeam, t }) {
  return (
    <Card className="card__form">
      <CardHeader tag="h2">
        {t('admin.teamsTable.title')}
      </CardHeader>
      <CardBody>
        <Table
            responsive
          >
            <thead>
              <tr>
                <th>#</th>
                <th>{t('admin.teamsTable.teamName')}</th>
                <th>{t('admin.teamsTable.teamNameEn')}</th>
                <th>{t('admin.teamsTable.abbreviation')}</th>
                <th>{t('admin.teamsTable.flag')}</th>
                <th>{t('admin.teamsTable.photo')}</th>
                <th>{t('shared.action')}</th>
              </tr>
            </thead>
            <tbody>
              {teams.items &&
                teams.items.map((team, index) =>
                <TeamsTableRow
                  team={team}
                  handleDeleteTeam={handleDeleteTeam}
                  index={index}
                  key={team.id}
                />
              )}
            </tbody>
        </Table>
      </CardBody>
    </Card>
  )
}
const translatedComponent = withNamespaces()(TeamsTable)
export { translatedComponent as TeamsTable }