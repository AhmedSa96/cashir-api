import { PartialType } from "@nestjs/swagger";
import { CreateSupplierReceiptDto } from "./create-supplier-receipt.dto";

export class UpdateSupplierReceiptDto extends PartialType(CreateSupplierReceiptDto) {}