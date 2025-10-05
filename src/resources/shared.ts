// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

export interface And {
  AND: Array<And.UnionMember0 | And.Or | And.And>;
}

export namespace And {
  export interface UnionMember0 {
    key: string;

    value: string;

    filterType?: 'metadata' | 'numeric' | 'array_contains';

    negate?: boolean | 'true' | 'false';

    numericOperator?: '>' | '<' | '>=' | '<=' | '=';
  }

  export interface Or {
    OR: Array<unknown>;
  }

  export interface And {
    AND: Array<unknown>;
  }
}

export interface Or {
  OR: Array<Or.UnionMember0 | Or.Or | Or.And>;
}

export namespace Or {
  export interface UnionMember0 {
    key: string;

    value: string;

    filterType?: 'metadata' | 'numeric' | 'array_contains';

    negate?: boolean | 'true' | 'false';

    numericOperator?: '>' | '<' | '>=' | '<=' | '=';
  }

  export interface Or {
    OR: Array<unknown>;
  }

  export interface And {
    AND: Array<unknown>;
  }
}
