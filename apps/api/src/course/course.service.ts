import { Injectable } from '@nestjs/common';

@Injectable()
export class CourseService {
     private courses = [
    { id: 1, name: 'CISC474', description: 'Web Applications' },
    { id: 2, name: 'CISC275', description: 'Intro to Software Engineering' },
    { id: 3, name: 'CISC361', description: 'Operating Systems' },
  ];

  findAll() {
    return this.courses;
  }

  findOne(id: number) {
    return this.courses.find((course) => course.id === id) || null;
  }
}
