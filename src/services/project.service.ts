export default class ProjectService {
    public static getData() {
        return [
            {
                tag: 'Container',
                attr: { className: 'test1' },
                children: [
                    {
                        tag: 'Col6',
                        attr: { className: 'test2' },
                        children: [
                            {
                                tag: 'Text',
                                attr: {},
                                children: ['我是你爸爸']
                            },
                            {
                                tag: 'Button',
                                attr: { className: 'test2', type: 'primary' },
                                children: ['Button按钮']
                            },
                            {
                                tag: 'Input',
                                attr: { value: 123123 },
                                children: []
                            }
                        ]
                    },
                    {
                        tag: 'Col',
                        attr: { className: 'test2' },
                        children: [
                            {
                                tag: 'HForm',
                                attr: { className: 'test2' },
                                children: []
                            }
                        ]
                    },
                    {
                        tag: 'Col',
                        attr: { className: 'test2' },
                        children: [
                            {
                                tag: 'Table',
                                attr: { className: 'test2' },
                                children: []
                            }
                        ]
                    }
                ]
            }
        ]
    }
}
