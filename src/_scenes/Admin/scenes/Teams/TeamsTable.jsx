import React from 'react'
import { Table } from 'reactstrap';
import PropTypes from 'prop-types'
import { Card, CardHeader, CardBody } from 'reactstrap';
import { withNamespaces } from 'react-i18next';

import { TeamsTableRow } from './TeamsTableRow'
import { Pagination, ItemsPerPageDropdown } from '../../../../_components';

TeamsTable.propTypes = {
  currentPage: PropTypes.number.isRequired,
  handleDeleteTeam: PropTypes.func.isRequired,
  onPageChanged: PropTypes.func.isRequired,
  onPerPageChanged: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  teams: PropTypes.object.isRequired,
  totalPages: PropTypes.number.isRequired,
  totalRecords: PropTypes.number.isRequired
}

TeamsTable.defaultProps = {
  teams: {}
}

function TeamsTable({
  currentPage,
  handleDeleteTeam, 
  onPageChanged, 
  onPerPageChanged,
  perPage,
  t,
  teams, 
  totalPages,
  totalRecords
}) {
  return (
    <Card className="card__form">
      <CardHeader 
        className="card__form__header"
      >
        <h2 className="card__form__title">{t('admin.teamsTable.title')}</h2>
        <ItemsPerPageDropdown
          perPage={perPage}
          onPerPageChanged={onPerPageChanged}
        />
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
                  page={currentPage}
                  perPage={perPage}
                  team={team}
                />
              )}
            </tbody>
        </Table>
      </CardBody>
      <Pagination
        currentPage={currentPage}
        onPageChanged={onPageChanged}
        perPage={perPage}
        totalPages={totalPages}
        totalRecords={totalRecords}
      />
    </Card>
  )
}
const translatedComponent = withNamespaces()(TeamsTable)
export { translatedComponent as TeamsTable }