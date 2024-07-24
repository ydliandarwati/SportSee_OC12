import { useParams } from 'react-router-dom'

import { useFetch } from '../../utils/useFetch'
import Card from '../../components/Card/Card'
import ChartsCard from '../../components/ChartsCard/ChartsCard'
import ChartActivity from '../../components/ChartActivity/ChartActivity'
import ChartAverageSessions from '../../components/ChartAverageSessions/ChartAcerageSessions'
import ChartGoal from '../../components/ChartGoal/ChartGoal'
import ChartPerformance from '../../components/ChartPerformance/ChartPerformance'

import energy from '../../assets/energy.svg'
import chicken from '../../assets/chicken.svg'
import apple from '../../assets/apple.svg'
import cheeseburger from '../../assets/cheeseburger.svg'

import './style.scss'

/**
 * Render Profil page
 *
 * @category Pages
 * @component
 * @returns { React.Component } A React component
 */
function Profil() {
	document.title = 'Profil - SportSee'

	const { userId } = useParams()
	/* Fetch the data from API or mocked data */
	const user = useFetch(
		`http://localhost:3000/user/${userId}`,
		userId,
		'SportSee_OC12/data/user-main-data.json'
	)
	const activity = useFetch(
		`http://localhost:3000/user/${userId}/activity`,
		userId,
		'SportSee_OC12/data/user-activity.json'
	)
	const averageSessions = useFetch(
		`http://localhost:3000/user/${userId}/average-sessions`,
		userId,
		'SportSee_OC12/data/user-average-sessions.json'
	)
	const performance = useFetch(
		`http://localhost:3000/user/${userId}/performance`,
		userId,
		'SportSee_OC12/data/user-performance.json'
	)

	/**
	 * Function to return on dataObject with the data from the API if available, or the mocked data if not.
	 * @param {Object} dataObject - Object that will contain the data .
	 * @param {Object} apiData - Data from the API.
	 * @returns The dataObject is returned.
	 */
	const formatData = (dataObject, apiData) => {
		if (apiData.apiData) {
			dataObject = apiData.apiData
			return dataObject
		} else if (apiData.mockedData) {
			dataObject = apiData.mockedData
			return dataObject
		}
	}

	/* Init the dataObject and format the data */
	let userData = {}
	userData = formatData(userData, user)
	let activityData = {}
	activityData = formatData(activityData, activity)
	let averageSessionsData = {}
	averageSessionsData = formatData(averageSessionsData, averageSessions)
	let performanceData = {}
	performanceData = formatData(performanceData, performance)

	/* If the data is loading, display a loading message to the user */
	if (
		user.isLoading ||
		activity.isLoading ||
		averageSessions.isLoading ||
		performance.isLoading
	) {
		return (
			<section className="profil-wrapper">
				<h2 className="center">Chargement...</h2>
			</section>
		)
	}

	/* If the fetches on the API and the mocked data returns errors, display a error message to the user */
	if (
		(user.errorAPI && user.errorMocked) ||
		(activity.errorAPI && activity.errorMocked) ||
		(averageSessions.errorAPI && averageSessions.errorMocked) ||
		(performance.errorAPI && performance.errorMocked)
	) {
		return (
			<section className="profil-wrapper">
				<h2 className="center">Une erreur est survenue !</h2>
			</section>
		)
	}

	return (
		<section className="profil-wrapper">
			{userData && (
				<div className="profil">
					<h2 className="profil-title">
						Bonjour{' '}
						<span className="profil-firstName">
							{userData.userInfos.firstName}
						</span>
					</h2>
					<p className="profil-subtitle">
						Félicitation ! Vous avez explosé vos objectifs hier 👏
					</p>
					<div className="dashboard">
						<div className="dashboard-charts-wrapper">
							<div className="activity-charts">
								{activityData && (
									<ChartActivity
										data={activityData.sessions}
									/>
								)}
							</div>
							<div className="small-card-wrapper">
								{averageSessionsData && (
									<ChartsCard
										className="average-sessions"
										content={
											<ChartAverageSessions
												data={
													averageSessionsData.sessions
												}
											/>
										}
									/>
								)}

								{performanceData && (
									<ChartsCard
										className="performance"
										content={
											<ChartPerformance
												data={performanceData}
											/>
										}
									/>
								)}
								{userData && (
									<ChartsCard
										className="score"
										content={<ChartGoal data={userData} />}
									/>
								)}
							</div>
						</div>

						<div className="dashboard-aside">
							<Card
								userKeyData={userData.keyData.calorieCount}
								unit="kCal"
								subtitle="Calories"
								className="calorie"
								logo={energy}
							/>
							<Card
								userKeyData={userData.keyData.proteinCount}
								unit="g"
								subtitle="Proteines"
								className="protein"
								logo={chicken}
							/>
							<Card
								userKeyData={userData.keyData.carbohydrateCount}
								unit="g"
								subtitle="Glucides"
								className="carbohydrate"
								logo={apple}
							/>
							<Card
								userKeyData={userData.keyData.lipidCount}
								unit="g"
								subtitle="Lipides"
								className="lipid"
								logo={cheeseburger}
							/>
						</div>
					</div>
				</div>
			)}
		</section>
	)
}

export default Profil
