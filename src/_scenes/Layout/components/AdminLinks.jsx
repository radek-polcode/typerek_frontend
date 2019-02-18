import React from 'react'
import { Link } from 'react-router-dom';
import { NavItem, NavLink } from 'reactstrap';
import { withNamespaces } from 'react-i18next';

function AdminLinks({ t }) {
  return (
    <>
      <NavItem>
        <NavLink tag={Link} to="/admin/dashboard">{t('navbar.dashboard')}</NavLink>
      </NavItem>
      <NavItem>
        <NavLink tag={Link} to="/admin/competitions">{t('navbar.competitions')}</NavLink>
      </NavItem>
      <NavItem>
        <NavLink tag={Link} to="/admin/users">{t('navbar.users')}</NavLink>
      </NavItem>
    </>
  )
}

const translatedAdminLinks = withNamespaces()(AdminLinks)

export { translatedAdminLinks as AdminLinks }