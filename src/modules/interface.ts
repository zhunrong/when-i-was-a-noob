export interface Sprite {
    x: number;
    y: number;
    render(ctx: CanvasRenderingContext2D): void;
}
