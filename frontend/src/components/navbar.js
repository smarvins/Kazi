import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';

const MainNav = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      {/* Navigation bar */}
      <Navbar light expand="md">
        <NavbarBrand>Kazi</NavbarBrand>
        <NavbarToggler style={{backgroundColor: '#ffde59'}} onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="nav-margin" navbar>
            {/* Tech dropdowns */}
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Tech used
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  ReactJS
                </DropdownItem>
                <DropdownItem>
                  Django (DRF)
                </DropdownItem>
                <DropdownItem>
                  SASS
                </DropdownItem>
                <DropdownItem>
                  Bootstrap
                </DropdownItem>
                <DropdownItem>
                  JSX
                </DropdownItem>
                <DropdownItem>
                  Git
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>

            {/* Language dropdowns */}
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Languages
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  JavaScript
                </DropdownItem>
                <DropdownItem>
                  Python
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>

            {/* Developer dropdowns */}
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Developer
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem href="http://www.stevemarvins.dev@gmail.com/">
                  Chat with me:)
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default MainNav;
