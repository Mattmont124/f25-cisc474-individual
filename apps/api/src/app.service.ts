import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World! If you wish to see the courses type /course , or users /user';
  }

  getCourses() {
    return [
      { id: 1, name: 'CISC474', description: 'Web Applications' },
      { id: 2, name: 'CISC275', description: 'Intro to Software Engineering' },
      { id: 3, name: 'CISC361', description: 'Operating Systems' },
    ];
  }
}
