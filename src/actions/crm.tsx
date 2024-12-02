import { User } from '../types/user';

// Fetch users from API and return the data
export const fetchUsers = async (): Promise<User[]> => {
	try {
		const response = await fetch('https://dummyjson.com/users');
		const data = await response.json();
		return data.users; // Return users list
	} catch (error) {
		console.error('Error fetching users:', error);
		return [];
	}
};
