import { Collector } from './collector';
import * as faker from 'faker';

describe('Collector', () => {
  it('should create an instance', () => {
    expect(
      new Collector(
        faker.datatype.number(),
        faker.name.findName(),
        faker.phone.phoneNumber(),
        faker.internet.email()
      )
    ).toBeTruthy();
  });
});
