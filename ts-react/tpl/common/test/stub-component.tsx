import * as React from 'react';

export function createStubComponent(displayName: string) {
    class StubComponent extends React.Component<any> {
        static displayName = displayName;
        render() {
            const displayProps = Object.keys(this.props).reduce(
                (prev, key) => {
                    let val = this.props[key];
                    const typeSig = Object.prototype.toString.call(val);
                    if (typeSig === '[object Function]') {
                        val = typeSig;
                    }
                    if (typeSig === '[object String]') {
                        val = `'${val}'`;
                    }
                    prev.push(`${key}="${val}"`);
                    return prev;
                },
                [],
            ).join(' ');
            const content = `<Stubbed name="${displayName}" ${displayProps}/>`;
            return <span dangerouslySetInnerHTML={{ __html: content }}></span>;
        }
    }
    return StubComponent;
}

export function replaceWithStubInTest<T extends {}>(Comp: T): T {
    if (!process.env.A2_JSDOM_TEST) {
        return Comp;
    }
    const ErasedComp = Comp as any;
    const Stub = createStubComponent(ErasedComp.displayName || ErasedComp.name);
    return Stub as any;
}
