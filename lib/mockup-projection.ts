export type Point = readonly [number, number];
export type Quad = readonly [Point, Point, Point, Point];
/** Map the source rectangle to TL, TR, BR, BL display corners, preserving source pixels. */
export function projectScreen(quad: Quad, sourceWidth: number, sourceHeight: number): number[] {
 const [[x0,y0],[x1,y1],[x2,y2],[x3,y3]] = quad;
 const dx1=x1-x2, dx2=x3-x2, dx3=x0-x1+x2-x3;
 const dy1=y1-y2, dy2=y3-y2, dy3=y0-y1+y2-y3;
 const determinant=dx1*dy2-dx2*dy1;
 if(Math.abs(determinant)<1e-8) throw new Error('Invalid screen quadrilateral');
 const g=(dx3*dy2-dx2*dy3)/determinant;
 const h=(dx1*dy3-dx3*dy1)/determinant;
 const a=x1-x0+g*x1, b=x3-x0+h*x3;
 const d=y1-y0+g*y1, e=y3-y0+h*y3;
 return [a/sourceWidth,d/sourceWidth,0,g/sourceWidth,b/sourceHeight,e/sourceHeight,0,h/sourceHeight,0,0,1,0,x0,y0,0,1];
}
