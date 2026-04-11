import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from 'entities/message.entity';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message) private messageRepository: Repository<Message>,
  ) {}

  async create(createMessageDto: CreateMessageDto) {
    const newMessage = this.messageRepository.create(createMessageDto);
    const message = await this.messageRepository.save(newMessage);

    return `Message created: ${JSON.stringify(message)}`;
  }

  async findAll() {
    const messages = await this.messageRepository.find();
    return messages;
  }

  async findOne(id: number) {
    const message = await this.messageRepository.findOne({ where: { id } });

    if (!message)
      throw new HttpException('Message not found', HttpStatus.NOT_FOUND);

    return `Message #${id}: ${JSON.stringify(message)}`;
  }

  async update(id: number, updateMessageDto: UpdateMessageDto) {
    const updatedMessage = await this.messageRepository.preload({
      id,
      ...updateMessageDto,
    });

    if (!updatedMessage)
      throw new HttpException('Message not found', HttpStatus.NOT_FOUND);

    const message = await this.messageRepository.save(updatedMessage);

    return `Message #${id} updated: ${JSON.stringify(message)}`;
  }

  async remove(id: number) {
    const message = await this.messageRepository.findOne({ where: { id } });
    if (!message)
      throw new HttpException('Message not found', HttpStatus.NOT_FOUND);

    await this.messageRepository.remove(message);
    return `This action removes a #${id} message`;
  }
}
