import rinss from 'rinss';
import { Point, PerspectiveTransform, rad2Deg } from 'ambients-math';
import Vue from 'vue';
import { SimpleWeakMap, SimpleMap } from 'ambients-utils';

const vertexMap = new SimpleWeakMap<HTMLElement, SimpleMap<HTMLElement>>();

export function globalVertex(el: HTMLElement, left = '0px', top = '0px'): Point {
    const map = vertexMap.forceGet(el, ()=>new SimpleMap());
    const v = map.forceGet(left + top, () => el.appendChild(rinss.inline(document.createElement('div'), {
        absLeft: left, absTop: top
    })));
    const rect0 = v.getBoundingClientRect();
    return new Point(rect0.left, rect0.top);
}

export function globalVertices(el: HTMLElement): Array<Point> {
    return [
        globalVertex(el, '0px', '0px'),
        globalVertex(el, '100%', '0px'),
        globalVertex(el, '100%', '100%'),
        globalVertex(el, '0px', '100%')
    ];
}

export function globalRotation(el:HTMLElement):number {
    const v = globalVertices(el);
    const p0 = v[0], p1 = v[1];
    return Math.atan2(p1.y - p0.y, p1.x - p0.x) * rad2Deg;
}

export function globalCenter(el: HTMLElement): Point {
    const r = el.getBoundingClientRect();
    return new Point((r.left + r.right) / 2, (r.top + r.bottom) / 2);
}

const pTransLocalToGlobal = new PerspectiveTransform()

export function localToGlobal(el: HTMLElement, x: number, y: number): Point {
    pTransLocalToGlobal.setSource(
        0, 0, el.clientWidth, 0, el.clientWidth, el.clientHeight, 0, el.clientHeight
    );
    const v = globalVertices(el);
    pTransLocalToGlobal.setDestination(
        v[0].x, v[0].y, v[1].x, v[1].y, v[2].x, v[2].y, v[3].x, v[3].y
    );
    return pTransLocalToGlobal.solve(x, y);
}

const pTransGlobalToLocal = new PerspectiveTransform()

export function globalToLocal(el: HTMLElement, x: number, y: number): Point {
    const v = globalVertices(el);
    pTransGlobalToLocal.setSource(v[0].x, v[0].y, v[1].x, v[1].y, v[2].x, v[2].y, v[3].x, v[3].y);
    pTransGlobalToLocal.setDestination(
        0, 0, el.clientWidth, 0, el.clientWidth, el.clientHeight, 0, el.clientHeight
    );
    return pTransGlobalToLocal.solve(x, y);
}

export function localToLocal(el0: HTMLElement, el1: HTMLElement, x0: number, y0: number): Point {
    const ptGlobal = localToGlobal(el0, x0, y0);
    return globalToLocal(el1, ptGlobal.x, ptGlobal.y);
}