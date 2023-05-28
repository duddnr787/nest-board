// import { Injectable, NotFoundException } from '@nestjs/common';
// import { BoardStatus } from './board-status.enum';
// import { CreateBoardDto } from './dto/create-board.dto';
// import { InjectRepository } from '@nestjs/typeorm';
// import { BoardRepository } from './board.repository';
// import { Board } from './board.entity';
// import { User } from 'src/auth/user.entity';

// @Injectable()
// export class BoardsService {
//   //서비스에 Repository 주입 시켜주기.
//   constructor(
//     @InjectRepository(Board)
//     private boardRepository: BoardRepository,
//   ) {}

//   async getAllBoards(user: User): Promise<Board[]> {
//     const query = this.boardRepository.createQueryBuilder('board');
//     query.where('board.userId = :userId', { userId: user.email });

//     const board = await query.getMany();
//     return board;
//   }

//   // async createBoard(
//   //   createBoardDto: CreateBoardDto,
//   //   user: User,
//   // ): Promise<Board> {
//   //   const { title, description } = createBoardDto;

//   //   const board = this.boardRepository.create({
//   //     title,
//   //     description,
//   //     status: BoardStatus.PUBLIC,
//   //     user,
//   //   });

//   //   await this.boardRepository.save(board);
//   //   return board;
//   // }

//   async getBoardById(id: number): Promise<Board> {
//     const found = await this.boardRepository.findOne(id);

//     if (!found) {
//       throw new NotFoundException(`Can not find Board with if ${id}`);
//     }
//     return found;
//   }

//   async deleteBoard(id: number, user: User): Promise<void> {
//     const result = await this.boardRepository.delete({ id, user });

//     if (result.affected === 0) {
//       throw new NotFoundException(`can not find id ${id}`);
//     }
//   }

//   async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
//     const foundBoard = await this.getBoardById(id);

//     foundBoard.status = status;
//     await this.boardRepository.save(foundBoard);
//     return foundBoard;
//   }
// }
