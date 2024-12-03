import React, { useEffect, useMemo, useState } from 'react';
import { User } from './types/user';
import { fetchUsers } from './actions/crm';
import { log } from 'console';

const App: React.FC = () => {
	const [users, setUsers] = useState<User[]>([]);
	const [nameFilter, setNameFilter] = useState('');
	const [cityFilter, setCityFilter] = useState('');
	const [highlightOldest, setHighlightOldest] = useState(false);


	// Fetch users once when the component is mounted
	useEffect(() => {
		const loadUsers = async () => {
			const usersData = await fetchUsers();
			setUsers(usersData); // Store fetched users
		};
		loadUsers();
	}, []);

	// Create a list of unique cities from user data
	const cities = Array.from(
		new Set(users.map((user) => user.address.city))
	);

	// Memoize filtered users to optimize performance
	const filteredUsers = useMemo(() => {
		return users
			.filter(
				(user) => !cityFilter || user.address.city === cityFilter
			)
			.filter(
				(user) =>
					user.firstName
						.toLowerCase()
						.includes(nameFilter.toLowerCase()) ||
					user.lastName
						.toLowerCase()
						.includes(nameFilter.toLowerCase())
			)
	}, [users, nameFilter, cityFilter]);



	return (
		<div className="app">
			<div className="filters">
				{/* Name filter input */}
				<label>
					Name:
					<input type="text" placeholder="Filter by name" value={nameFilter}
						onChange={(e) => setNameFilter(e.target.value)} />
				</label>

				{/* City filter dropdown */}
				<label>
					City:
					<select
						value={cityFilter}
						onChange={(e) => setCityFilter(e.target.value)}
					>
						<option value="">All Cities</option>
						{cities.map((city, index) => (
							<option key={index} value={city}>
								{city}
							</option>
						))}
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
					{filteredUsers.length
						?
						filteredUsers.map((user) => (
							<tr key={user.id}>
								<td>{`${user.firstName} ${user.lastName}`}</td>
								<td>{user.address.city}</td>
								<td>
									{new Date(user.birthDate).toLocaleDateString()}
								</td>
							</tr>
						))
						: <tr><td colSpan={3}>No results</td></tr>
					}
				</tbody>
			</table>
		</div>
	);
};

export default App;
