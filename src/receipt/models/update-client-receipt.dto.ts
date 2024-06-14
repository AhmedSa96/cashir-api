import { PartialType } from "@nestjs/swagger";
import { CreateClientReceiptDto } from "./create-client-receipt.dto";

export class UpdateClientReceiptDto extends PartialType(CreateClientReceiptDto) {}