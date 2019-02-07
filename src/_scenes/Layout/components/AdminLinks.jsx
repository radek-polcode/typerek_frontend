import React from 'react'
import { Link } from 'react-router-dom';
import { NavItem, NavLink } from 'reactstrap';

function AdminLinks() {
  return (
    <>
      <NavItem>
        <NavLink tag={Link} to="/admin/dashboard">Dashboard</NavLink>
      </NavItem>
      <NavItem>
        <NavLink tag={Link} to="/admin/users">Users</NavLink>
      </NavItem>
    </>
  )
}

export { AdminLinks }