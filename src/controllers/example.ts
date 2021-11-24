export class Example {
    constructor(public parameters: string) {}

    get parameterValue(): string {
        return this.parameters;
    }
}
