import React from 'react';

const App: React.FC = () => {
	return (
		<div className="app">
			<div className="filters">
				{/* Name filter input */}
				<label>
					Name:
					<input type="text" placeholder="Filter by name" />
				</label>

				{/* City filter dropdown */}
				<label>
					City:
					<select>
						<option value="">All Cities</option>
					</select>
				</label>

				{/* Highlight oldest checkbox */}
				<label>
					Highlight oldest:
					<input type="checkbox" />
				</label>
			</div>

			{/* Users table */}
			<table className="user-table">
				<thead>
					<tr>
						<th>Name</th>
						<th>City</th>
						<th>Birthday</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>User name surname</td>
						<td>Address city</td>
						<td>30.5.1996</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default App;
