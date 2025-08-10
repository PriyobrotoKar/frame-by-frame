import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class QueryTransformPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type === 'query') {
      // Convert string values to numbers for pagination parameters
      if (metadata.data === 'page') {
        return isNaN(value) ? 0 : Number(value);
      }
      if (metadata.data === 'limit') {
        return isNaN(value) ? 10 : Number(value);
      }
    }
    return value;
  }
}
