import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from 'entities/message.entity';
import { UsersService } from 'modules/users/users.service';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message) private messageRepository: Repository<Message>,
    private readonly usersService: UsersService,
  ) {}

  async create(createMessageDto: CreateMessageDto) {
    await this.usersService.findOne(createMessageDto.fromId);
    await this.usersService.findOne(createMessageDto.toId);

    const newMessage = this.messageRepository.create(createMessageDto);
    const message = await this.messageRepository.save(newMessage);

    return `Message created: ${JSON.stringify(message)}`;
  }

  async findAll() {
    const messages = await this.messageRepository.find({
      relations: ['from', 'to'],
      order: { createdAt: 'DESC' },
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        from: {
          id: true,
          name: true,
          email: true,
        },
        to: {
          id: true,
          name: true,
          email: true,
        },
      },
    });
    return messages;
  }

  async findOne(id: number) {
    const message = await this.messageRepository.findOne({ where: { id } });

    if (!message)
      throw new HttpException('Message not found', HttpStatus.NOT_FOUND);

    return `Message #${id}: ${JSON.stringify(message)}`;
  }

  async update(id: number, updateMessageDto: UpdateMessageDto) {
    await this.usersService.findOne(updateMessageDto.fromId);
    await this.usersService.findOne(updateMessageDto.toId);

    const updatedMessage = await this.messageRepository.preload({
      id,
      ...updateMessageDto,
    });

    if (!updatedMessage)
      throw new NotFoundException(`Message with id ${id} not found`);

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
