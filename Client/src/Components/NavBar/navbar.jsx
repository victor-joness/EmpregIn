import React from "react";

import './Navbar.css'

import { FiUsers } from "react-icons/fi";
import { BsSuitcaseLg } from "react-icons/bs";
import { FaSistrix } from "react-icons/fa6";
import { FaRss } from "react-icons/fa6";
import { FiBook } from "react-icons/fi";
import { BiComment } from "react-icons/bi";
import { MdArrowOutward } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { useSelector } from "react-redux";

const NavBar = () => {
	const user = useSelector((state) => state.user.value)

	return (
		<div className="header">
			<div className="box_logo">
				<img src="Images\logo.svg" alt="Logo da Aplicação" />
			</div>
			<div className="box_icons_navigation">
				<ul>
					<li><a href="#"><FaRss /> <span>Feed</span></a></li>
					<li><a href="#"><FiUsers /> <span>Network</span></a></li>
					<li><a href="#"><BsSuitcaseLg /> <span>Jobs</span></a></li>
					<li><a href="#"><BiComment /> <span>Chat</span></a></li>
					<li><a href="#"><FiBook /> <span>Algoritm</span></a></li>
				</ul>
			</div>
			<div className="box_search">
				<label htmlFor="search"><FaSistrix /></label>
				<input type="text" placeholder="Search" id="search"/>
			</div>
			<div className="box_account">
				<div className="box_profile_image">
					<img 
						src={user?.photoURL ? user.photoURL : "src/assets/profile_image.png"}
						alt="Foto de Perfil" 
					/>
				</div>
				<div className="box_accounts_info">
					<div className="box_info_name">
						<h2 className="profile_name">{user && user.displayName}</h2> 
						<span className="text_indication">you</span>
					</div>
					<div className="box_info_views">
						<p className="views_today">367 views today</p>
						<span className="new_followers">+32 <MdArrowOutward /></span>
					</div>
				</div>
			</div>
			<div className="box_logout">
				<button className="btn_logout" type="button">
					<IoIosLogOut /> 
					<span>Logout</span>
				</button>
			</div>
		</div>
	)
};

export default NavBar;
