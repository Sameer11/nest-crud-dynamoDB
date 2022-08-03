import { Controller, Get, Param, Post, Body, Delete, Query } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create.student.dto';

@Controller('students')
export class StudentsController {
    constructor(private studentsService: StudentsService) {}
    @Get()
    async getStudents() {
        const students = await this.studentsService.getStudents();
        return students
    }
    @Get(':studentId')
    async getStudent(@Param('studentId') studentId: string) {
        const student = await this.studentsService.getStudent(studentId);
        return student;
    }
    @Post()
    async addStudent(@Body() createStudentDto: CreateStudentDto) {
        const student = await this.studentsService.addStudent(createStudentDto);
        return student;
    }
    @Delete(':studentId')
    async deleteStudent(@Param('studentId') studentId: string) {
        const students = await this.studentsService.deleteStudent(studentId);
        return students;
    }
}
