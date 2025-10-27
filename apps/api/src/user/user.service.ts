import { Injectable } from '@nestjs/common';

export interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable()
export class UserService {
  // Sample users for demonstration
  private users: User[] = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com' },
    { id: 3, name: 'Charlie Brown', email: 'charlie@example.com' },
  ];

  // Return all users
  findAll(): User[] {
    return this.users;
  }

  // Return a single user by ID
  findOne(id: number): User | null {
    return this.users.find(user => user.id === id) || null;
  }

  // Optionally, find a user by email (useful for Auth0 integration)
  findByEmail(email: string): User | null {
    return this.users.find(user => user.email === email) || null;
  }
}