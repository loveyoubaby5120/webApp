declare global {
    // jest types, not very complete, but enough for existing usage.
    const beforeEach: (fn: () => void) => void;
    const afterEach: (fn: () => void) => void;
    const beforeAll: (fn: () => void) => void;
    const afterAll: (fn: () => void) => void;
    const test: (description: string, fn: () => void) => void;
    const expect: (v: any) => {
        toMatchSnapshot: (name?: string) => void,
    };
    const describe: (description: string, fn: () => void) => void;
    const jest: { setTimeout: (timeout: number) => void };
}

export { };
