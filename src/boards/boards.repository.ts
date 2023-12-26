import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Boards } from '@prisma/client';
import { UpdateBoardDto } from './dto/update-board.dto';

@Injectable()
export class BoardRepository {
  constructor(private prisma: PrismaService) {}
  async create(createBoardDto: CreateBoardDto) {
    const { title, contents } = createBoardDto;
    return await this.prisma.boards.create({
      data: {
        title: title,
        contents: contents,
      },
    });
  }

  async findAll(): Promise<Boards[]> {
    return await this.prisma.boards.findMany();
  }

  async findOne(id: number): Promise<Boards> {
    return await this.prisma.boards.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateBoardDto: UpdateBoardDto): Promise<Boards> {
    const { title, contents } = updateBoardDto;
    return await this.prisma.boards.update({
      where: {
        id,
      },
      data: {
        title: title,
        contents: contents,
      },
    });
  }

  async remove(id: number): Promise<void> {
    await await this.prisma.boards.delete({
      where: {
        id: id,
      },
    });
  }
}
