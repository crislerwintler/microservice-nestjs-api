import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Videos } from 'src/models/video.model';
import { Repository } from 'typeorm';

@Controller('videos')
export class VideosController {
  constructor(
    @InjectRepository(Videos)
    private videoRepo: Repository<Videos>,
  ) {}
  @Get()
  index() {
    return this.videoRepo.find();
  }

  @Get(':id')
  show(@Param('id') id: string) {
    return this.videoRepo.findOneOrFail(id);
  }
  @Post()
  store(@Body() body) {
    const video = this.videoRepo.create(body);
    return this.videoRepo.save(video);
  }
  @Put(':id')
  async update(@Param('id') id: string, @Body() body) {
    await this.videoRepo.findOneOrFail(id);
    this.videoRepo.update({ id: +id }, body);
    return await this.videoRepo.findOne(id);
  }
  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    await this.videoRepo.findOneOrFail(id);
    this.videoRepo.delete(id);
  }
}
