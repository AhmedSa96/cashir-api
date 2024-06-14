import { PartialType } from "@nestjs/swagger";
import { CreateConstantDto } from "./create-constant.dto";

export class UpdateConstantDto extends PartialType(CreateConstantDto) {}