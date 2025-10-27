import { PartialType } from '@nestjs/mapped-types';

import { CreateLinkDto } from './create-link.dto';

//export class UpdateLinkDto extends PartialType(CreateLinkDto) {}

import { z } from "zod";

export const updateLinkSchema = z.object({
  id: z.string(), // or z.number() if using numeric IDs
  title: z.string().optional(),
  url: z.string().url().optional(),
  description: z.string().optional(),
});
