import React from 'react'
import { Table } from 'reactstrap';
import PropTypes from 'prop-types'
import { Card, CardHeader, CardBody } from 'reactstrap';
import { withNamespaces } from 'react-i18next';

import { TeamsTableRow } from './TeamsTableRow'
import { Pagination } from '../../../../_components';

TeamsTable.propTypes = {
  handleDeleteTeam: PropTypes.func.isRequired,
  onPageChanged: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  teams: PropTypes.object.isRequired
}

TeamsTable.defaultProps = {
  teams: {}
}

function TeamsTable({ teams, handleDeleteTeam, onPageChanged, t }) {
  const meta = teams.meta
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
                  handleDeleteTeam={handleDeleteTeam}
                  index={index}
                  key={team.id}
                  page={meta.current_page}
                  team={team}
                />
              )}
            </tbody>
        </Table>
      </CardBody>
      <Pagination
        meta={meta}
        onPageChanged={onPageChanged}
      />
    </Card>
  )
}
const translatedComponent = withNamespaces()(TeamsTable)
export { translatedComponent as TeamsTable }