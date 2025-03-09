import { IsString, IsEmail } from "class-validator";

export class LoginDto {

    @IsEmail()
    email: string;

    @IsString()
    password: string;
}

export class tokenDto {
    @IsString()
    token: string;
}