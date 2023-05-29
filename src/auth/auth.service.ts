import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<boolean> {
    const { email, password } = createUserDto;
    //비크립트 사용해 비번 암호화 하기
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.userRepository.create({
      email,
      password: hashedPassword,
    });
    try {
      await this.userRepository.save(user);
      return true;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Existing username');
        return false;
      } else {
        throw new InternalServerErrorException();
        return false;
      }
    }
  }

  async signIn(createUserDto: CreateUserDto): Promise<{ accessToken: string }> {
    const { email, password } = createUserDto;
    const user = await this.userRepository.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      //유저 토큰 생성 ( 시크릿 + 페이로드 )
      const payload = { email };
      const accessToken = await this.jwtService.sign(payload);

      return { accessToken };
    } else {
      throw new UnauthorizedException('login failed');
    }
  }

  async dupCheck(email: string): Promise<boolean> {
    const userEmail = await this.userRepository.findOne({ email });
    if (userEmail === undefined) {
      return false;
    } else {
      return true;
    }
  }
}
