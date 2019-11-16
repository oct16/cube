/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />

declare namespace NodeJS {
    interface ProcessEnv {
        readonly NODE_ENV: 'development' | 'production' | 'test'
        readonly PUBLIC_URL: string
    }
}

declare module '*.bmp' {
    const src: string
    export default src
}

declare module '*.gif' {
    const src: string
    export default src
}

declare module '*.jpg' {
    const src: string
    export default src
}

declare module '*.jpeg' {
    const src: string
    export default src
}

declare module '*.png' {
    const src: string
    export default src
}

declare module '*.webp' {
    const src: string
    export default src
}

declare module '*.svg' {
    import * as React from 'react'

    export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>

    const src: string
    export default src
}

declare module '*.module.css' {
    const classes: { [key: string]: string }
    export default classes
}
declare module '*.module.styl' {
    const classes: { [key: string]: string }
    export default classes
}
declare module '*.module.stylus' {
    const classes: { [key: string]: string }
    export default classes
}

declare module 'react-sortablejs' {
    import Sortable from 'sortablejs'

    export interface SortableProps<ItemData, ListProps> {
        options?: Sortable.Options
        onChange?: (list: ItemData[], sortable: Sortable, event: Sortable.SortableEvent) => void
        tag?: string | React.ComponentType<ListProps>
        style?: React.CSSProperties
    }

    export default class SortableComponent<ItemData, ListProps> extends React.Component<
        SortableProps<ItemData, ListProps>
    > {}
}
