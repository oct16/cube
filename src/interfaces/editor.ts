export interface CNode {
    tag: string
    attr: { [key: string]: string | number | boolean }
    children: CNode[]
}
