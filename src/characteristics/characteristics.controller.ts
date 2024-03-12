import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CharacteristicsService } from './characteristics.service';
import { CreateCharacteristicDto } from './dto/create-characteristic.dto';
import { UpdateCharacteristicDto } from './dto/update-characteristic.dto';

@ApiTags('Characteristics')
@Controller('characteristics')
export class CharacteristicsController {
  constructor(
    private readonly characteristicsService: CharacteristicsService,
  ) {}

  @Post()
  async create(@Body() createCharacteristicDto: CreateCharacteristicDto) {
    try {
      const result = await this.characteristicsService.create(
        createCharacteristicDto,
      );
      return result;
    } catch (error) {
      // Handle the error appropriately, for example, log it or send a specific response
      console.error('Error creating characteristic:', error.message);
      throw new Error('Failed to create characteristic');
    }
  }

  @Get()
  async findAll() {
    try {
      const result = await this.characteristicsService.findAll();
      return result;
    } catch (error) {
      console.error('Error fetching characteristics:', error.message);
      throw new Error('Failed to fetch characteristics');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const result = await this.characteristicsService.findOne(+id);
      return result;
    } catch (error) {
      console.error(
        `Error fetching characteristic with ID ${id}:`,
        error.message,
      );
      throw new Error(`Failed to fetch characteristic with ID ${id}`);
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCharacteristicDto: UpdateCharacteristicDto,
  ) {
    try {
      const result = await this.characteristicsService.update(
        +id,
        updateCharacteristicDto,
      );
      return result;
    } catch (error) {
      console.error(
        `Error updating characteristic with ID ${id}:`,
        error.message,
      );
      throw new Error(`Failed to update characteristic with ID ${id}`);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const result = await this.characteristicsService.remove(+id);
      return result;
    } catch (error) {
      console.error(
        `Error deleting characteristic with ID ${id}:`,
        error.message,
      );
      throw new Error(`Failed to delete characteristic with ID ${id}`);
    }
  }
}
