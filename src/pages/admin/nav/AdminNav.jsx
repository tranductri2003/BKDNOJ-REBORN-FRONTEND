import React from 'react';
import {connect} from 'react-redux';

import { Link } from 'react-router-dom';
import {
  VscAccount,
  VscOrganization,
  VscListOrdered,
  VscFileCode,
  VscServer
} from 'react-icons/vsc';
import { FaTags } from 'react-icons/fa';
import { GiTrophyCup } from 'react-icons/gi';

import logo from 'assets/images/bkdnoj-favicon-ring.png';
import './AdminNav.scss';

class AdminNav extends React.Component {
  render() {
    const {user} = this.props;
    const isStaff = user && user.is_staff;
    const isSuperuser = user && user.is_superuser;

    return (
      <ul className="admin-nav nav navbar-nav sidebar" id="admin-sidebar">
        <li className='nav-header-item'>
          <Link to='/' replace className='nav-link'>Site</Link>
        </li>

        <hr className="sidebar-divider "/>

        <Link to='' className='sidebar-brand brand'>
          <img src={logo} className="img-fluid site-icon" />
          <p className="site-icon-text">
            {
              isSuperuser ? <span className="text-primary">Admin</span>
              : (isStaff ? <span className="text-warning">Staff</span>
                          : <span className="text-danger">Unauthorized</span>
                )
            }
          </p>
        </Link>

        <hr className="sidebar-divider "/>

        <li className='nav-item'>
          <Link to='users' className='nav-link'>
            <VscAccount className='icon'/>
            Users
          </Link>
        </li>
        <li className='nav-item'>
          <Link to='orgs' className='nav-link'>
            <VscOrganization className='icon'/>
            Organizations
          </Link>
        </li>

        <li className='nav-item'>
          <Link to='problems' className='nav-link'>
            <VscListOrdered className='icon'/>
            Problems
          </Link>
        </li>
        <li className='nav-item'>
          <Link to='problem-tags' className='nav-link'>
            <FaTags className='icon'/>
            Problem Tags
          </Link>
        </li>
        <li className='nav-item'>
          <Link to='contests' className='nav-link'>
            <GiTrophyCup className='icon'/>
            Contests
          </Link>
        </li>
        <li className='nav-item'>
          <Link to='submissions' className='nav-link'>
            <VscFileCode className='icon'/>
            Submissions
          </Link>
        </li>
        <li className='nav-item'>
          <Link to='judges' className='nav-link'>
            <VscServer className='icon'/>
            Judges
          </Link>
        </li>
      </ul>
    )
  }
}


const mapStateToProps = state => {
  return {
    user: state.user.user,
    profile: state.profile.profile,
  }
}

export default connect(mapStateToProps, null)(AdminNav);
