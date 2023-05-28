// import {
//   Body,
//   Controller,
//   Delete,
//   Get,
//   Logger,
//   Param,
//   ParseIntPipe,
//   Patch,
//   Post,
//   UseGuards,
//   UsePipes,
//   ValidationPipe,
// } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
// import { GetUser } from 'src/auth/get-user.decorator';
// import { User } from 'src/auth/user.entity';
// import { BoardStatus } from './board-status.enum';
// import { Board } from './board.entity';
// import { BoardsService } from './boards.service';
// import { CreateBoardDto } from './dto/create-board.dto';
// import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

// @Controller('boards')
// @UseGuards(AuthGuard())
// export class BoardsController {
//   private logger = new Logger('BoardsController');
//   constructor(private boardService: BoardsService) {}

//   // 로그인한 유저 게시물만 가져올 수 있음.
//   @Get()
//   getAllBoards(@GetUser() user: User): Promise<Board[]> {
//     this.logger.verbose(
//       `해당 아이디 ${user.email} 로 만든 게시물 가져 오는 중 `,
//     );
//     return this.boardService.getAllBoards(user);
//   }

//   @Post()
//   @UsePipes(ValidationPipe)
//   createBoard(
//     @Body() createBoardDto: CreateBoardDto,
//     @GetUser() user: User,
//   ): Promise<Board> {
//     this.logger.verbose(
//       `게시물을 생성하는 중 아이디 : ${user.email} 내용 : ${JSON.stringify(
//         createBoardDto,
//       )}`,
//     );
//     return this.boardService.createBoard(createBoardDto, user);
//   }

//   @Get('/:id')
//   getBoardById(@Param('id') id: number): Promise<Board> {
//     return this.boardService.getBoardById(id);
//   }

//   @Delete('/:id')
//   //들어 오는 값이 무조건 int여야하기 때문에 파이프로 확실하게 유효성 검사를 해준다.
//   delete(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
//     this.boardService.deleteBoard(id, user);
//   }

//   @Patch('/:id/status')
//   //들어오는 id 값이 무조건 int여야하기 때문에 파이프로 확실하게 유효성 검사를 해준다.
//   //들어오는 status 값에 대한 파이프.
//   updateBoardStatus(
//     @Param('id', ParseIntPipe) id: number,
//     @Body('status', BoardStatusValidationPipe) status: BoardStatus,
//   ) {
//     return this.boardService.updateBoardStatus(id, status);
//   }
// }
