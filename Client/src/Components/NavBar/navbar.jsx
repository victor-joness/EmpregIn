import React from "react";

import './navbar.css'

const NavBar = () => {
  return (
    <div className="header">
    	<div className="box_logo">
        	<img src="src/assets/logo.svg" alt="Logo da Aplicação" />
        </div>
        <div className="box_icons_navigation">
        	<ul>
            	<li><a href="#">Feed</a></li>
            	<li><a href="#">Network</a></li>
            	<li><a href="#">Jobs</a></li>
            	<li><a href="#">Chat</a></li>
            	<li><a href="#">Notices</a></li>
          	</ul>
        </div>
		<div className="box_search">
			<input type="text" placeholder="search"/>
		</div>
		<div className="box_account">
			<div className="box_profile_image">
				<img src="src/assets/profile_image.png" alt="Foto de Perfil" />
			</div>
			<div className="box_accounts_info">
				<div>
					<h2 className="profile_name">S. Lopes</h2> 
					<span className="text_indication">YOU</span>
				</div>
				<div>
					<p>367 views today</p>
					<span>+32 ICON</span>
				</div>
			</div>
		</div>
		<div className="box_others_info">
			ICON
			<p>OTHER</p>
		</div>
    </div>
  )
};

export default NavBar;
