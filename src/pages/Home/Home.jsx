
import styled from "styled-components"
import { Link } from 'react-router-dom'


import './style.scss'

/**
 * Render Home page
 *
 * @category Pages
 * @component
 * @returns { React.Component } A React component
 */
function Home() {
	document.title = 'Accueil - SportSee'
	return (
		<Wrapper>
		<H1>Bienvenue sur <Span color="#FF0101">SportSee</Span></H1>
		<P marginTop="1rem">Projet 12 de la formation OpenClassrooms, création d'un tableau de bord avec React. Cliquez sur l'identifiant d'un utilisateur pour voir ses données :</P>
		<P marginTop="1rem">
			<Link to="/profil/12">User 12</Link>
		</P>
		<P>
			<Link to="/profil/18">User 18</Link>
		</P>
		</Wrapper>

		
	)
}
export default Home

const Wrapper = styled.main`
	margin-left: 150px;
	margin-top: 120px;
	@media (max-width: 700px) {
		margin: 100px 0;
		padding: 0 30px;
	}
`
const H1 = styled.h1`
	font-size: 40px;
`
const Span = styled.span`
	color: ${({color}) => color};
`
const P = styled.p`
	margin-top: ${({marginTop}) => marginTop};
`
