import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Board } from './board.model';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';

@Controller('boards')
export class BoardsController {
  constructor(private boardService: BoardsService) {}

  @Get('/')
  getAllBoard(): Board[] {
    return this.boardService.getAllboards();
  }

  @Post()
  createBoard(@Body() CreateBoardDto: CreateBoardDto): Board {
    return this.boardService.createBoard(CreateBoardDto);
  }

  @Get('/:id')
  getBoardById(@Param(':id') id: string): Board {
    return this.boardService.getBoardById(id);
  }
}
