import { test as baseTest, request as baseRequest } from '../core/fixture/base-fixture';
import { PageFixtureType, pageFixture } from './page-fixture';
import { APIFixtureType, apiFixture } from './api-fixture';

export const testMain = baseTest.extend<APIFixtureType & PageFixtureType>({
    ...apiFixture,
    ...pageFixture
})

export const base = baseTest;
export const requestMain = baseRequest;
export const expectMain = base.expect;