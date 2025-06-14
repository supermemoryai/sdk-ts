// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { Supermemory } from '../client';

export abstract class APIResource {
  protected _client: Supermemory;

  constructor(client: Supermemory) {
    this._client = client;
  }
}
