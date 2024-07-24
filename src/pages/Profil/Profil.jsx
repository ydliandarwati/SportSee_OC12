import { useParams } from 'react-router-dom'

import { useFetch } from '../../utils/useFetch'
import Card from '../../components/Card/Card'
import ChartsCard from '../../components/ChartsCard/LineChart'
import ChartBar from '../../components/BarChart/BarChart'
import ChartLine from '../../components/LineChart/LineChart'
import ChartRadial from '../../components/RadialChart/RadialChart'
import ChartRadar from '../../components/RadarChart/RadarChart'

import energy from '../../assets/energy.svg'
import chicken from '../../assets/chicken.svg'
import apple from '../../assets/apple.svg'
import cheeseburger from '../../assets/cheeseburger.svg'

import './style.scss'

function Profil() {
	document.title = 'Profil - SportSee'

	const { userId } = useParams()
	/* Fetch the data from API or mocked data */
	const user = useFetch(
		userId,
		`http://localhost:3000/user/${userId}`,
		'SportSee_OC12/data/user-main-data.json'
	)
	const activity = useFetch(
		userId,
		`http://localhost:3000/user/${userId}/activity`,
		'SportSee_OC12/data/user-activity.json'
	)
	const averageSessions = useFetch(
		userId,
		`http://localhost:3000/user/${userId}/average-sessions`,
		'SportSee_OC12/data/user-average-sessions.json'
	)
	const performance = useFetch(
		userId,
		`http://localhost:3000/user/${userId}/performance`,
		'SportSee_OC12/data/user-performance.json'
	)

	// to return on dataObject with the data from the API if available, or the mocked data if not.
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

	// when fetch API/mocked data fails, show an error message
	if (
		(user.errorAPI && user.errorMocked) ||
		(activity.errorAPI && activity.errorMocked) ||
		(averageSessions.errorAPI && averageSessions.errorMocked) ||
		(performance.errorAPI && performance.errorMocked)
	) {
		return (
			<section className="profil-wrapper">
				<h2 className="center">Erreur lors du chargement des données !</h2>
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
									<ChartBar
										data={activityData.sessions}
									/>
								)}
							</div>
							<div className="small-card-wrapper">
								{averageSessionsData && (
									<ChartsCard
										className="average-sessions"
										content={
											<ChartLine
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
											<ChartRadar
												data={performanceData}
											/>
										}
									/>
								)}
								{userData && (
									<ChartsCard
										className="score"
										content={<ChartRadial data={userData} />}
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
