declare class Browser {
    static waitDuration: string;
    static localhost(host: string, port: number);

    window: Window;

    constructor();

    on(event: string, action: (obj: any) => void);
    visit(url: string, opt?: {}): Promise<void>;
    destroy();
};

export = Browser;
