import { buildClientSchema, graphql } from "graphql";
import { addMockFunctionsToSchema } from "graphql-tools";

// Create a deterministic mock for testing.
export const createGQLMock = (introspection: any) => {
    const schema = buildClientSchema(introspection.data);
    addMockFunctionsToSchema({ schema, mocks: makeMocks() });
    let counter = 0;

    return {
        execute,
    };

    function execute(query: string, variables?: { [key: string]: any }) {
        counter = 0;
        return graphql(schema, query, null, null, variables);
    }

    function makeMocks() {
        const mocks = {
            String: () => {
                counter++;
                return 'hello world ' + counter;
            },
            Int: () => {
                counter++;
                return counter;
            },
            Float: () => {
                counter++;
                return counter / 10.0;
            },
            Boolean: () => {
                counter++;
                return !!(counter / 2);
            },
        };
        return mocks;
    }
};
