import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { BoardRepository } from './boards.repository';
import { Boards } from '@prisma/client';

@Injectable()
export class BoardsService {
  constructor(private boardRepository: BoardRepository) {}
  async create(createBoardDto: CreateBoardDto) {
    return this.boardRepository.create(createBoardDto);
  }

  async findAll(): Promise<Boards[]> {
    return this.boardRepository.findAll();
  }

  async findOne(id: number): Promise<Boards> {
    return this.boardRepository.findOne(id);
  }

  async update(id: number, updateBoardDto: UpdateBoardDto): Promise<Boards> {
    return this.boardRepository.update(id, updateBoardDto);
  }

  async remove(id: number): Promise<void> {
    return this.boardRepository.remove(id);
  }
}
