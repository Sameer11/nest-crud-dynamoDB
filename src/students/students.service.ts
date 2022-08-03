import { Injectable, HttpException, InternalServerErrorException } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

let awsConfig = {
    "region": "ap-south-1",
    "accessKeyId": "PUT_YOUT_ACCESS_KEY_HERE",
    "secretAccessKey": "PUT_YOUT_SECRET_HERE",
}

AWS.config.update(awsConfig)

const dynamoDB = new AWS.DynamoDB.DocumentClient();

@Injectable()
export class StudentsService {

    async getStudents(): Promise<any> {
        let student;
        try {
        const result = await dynamoDB.scan({TableName: 'trusity'}).promise();
            student = result.Items || [];
        } catch (error) {
        throw new InternalServerErrorException(error);
        }
        return student;
    }
    
    async getStudent(student_id): Promise<any> {
        let student;
        try {
        const result = await dynamoDB.get({
            //   TableName: process.env.USERS_TABLE_NAME,
            TableName: 'trusity',
            Key: {student_id },
            })
            .promise();
            student = result.Item || {};
        } catch (error) {
            console.log(error)
        throw new InternalServerErrorException(error);
        }
        return student;
    }

    async addStudent(student): Promise<any> {
        try {
            let params = {
                Item: {
                "student_id": uuidv4(), 
                "name": student.name, 
                "email": student.email,
                "contact_no": student.contactNo
                }, 
                TableName: "trusity"
            };

                dynamoDB.put(params, function(err, data) {
                if (err) console.log(err, err.stack); // an error occurred
                else     console.log(data);           // successful response
            });
        } catch (error) {
            console.log(error)
            throw new InternalServerErrorException(error);
        }
    }

    async deleteStudent(studentId: string): Promise<any> {
        try {
            const params = {
                TableName: 'trusity',
                Key: {
                    student_id: studentId,
                },
              };
            const result = dynamoDB.delete(params).promise();
            return true
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}
