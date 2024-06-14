import { PartialType } from "@nestjs/swagger";
import { CreatePurchesDto } from "./create-purches.dto";

export class UpdatePurchesDto extends PartialType(CreatePurchesDto) {}