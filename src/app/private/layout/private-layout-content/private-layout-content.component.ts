import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-private-layout-content',
  templateUrl: './private-layout-content.component.html',
  styleUrls: ['./private-layout-content.component.scss']
})
export class PrivateLayoutContentComponent implements OnInit {

  @ViewChild('bolb', { static: false }) bolb?: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit()
  {
    // setTimeout(() => {
    //   this.beginBolding();
    // }, 500);
  }

  beginBolding(): void {
      this.createParticles({
        particleNumber: 55,
        particleSize: 150,
        randomizeSize: true,
        randomizeColors: true,
        particleBorderRadius: 50,
        blobs: true,
        randomizeOpacity: true,
        colors: {
          firstColor: "ff0000",
          secondColor: true
        },
        animation: "blobs",
        animationDuration: 20,
        animationLoop: true
      });

  }

  private createParticles({
    particleNumber: o = 140,
    particleSize: t = 165,
    colors: e = {
        firstColor: "#fff",
        secondColor: !1
    },
    randomizeSize: a = !0,
    particleBorderRadius: r = 50,
    randomizeOpacity: n = !0,
    randomizeColors: i = !0,
    animation: l = "float",
    animationDuration: s = 20,
    animationLoop: d = !0,
    blobs: c = !1
}) {
    let u, m, f, adogo: any, h: any, M: any | any[] | NodeListOf<Element>, b, C, $, x, y, z, g, S, _;
    u = document.querySelector(".particles");
    for (let t = 0; t < o; t++)(m = document.createElement("div")).classList.add("particle__element"), u?.appendChild(m);
    f = document.querySelector(".particle__canvas"), M = document.querySelectorAll(".particle__element"), adogo = this.bolb?.nativeElement.clientHeight - 150, h = this.bolb?.nativeElement.clientWidth -100;
    for (let o = 0; o < M.length; o++) {
        function D() {
            return Math.floor(60 * Math.random() + 40)
        }
        if (b = M[o].style, C = Math.floor(Math.random() * adogo), $ = Math.floor(Math.random() * h), x = Math.random(), b.position = "absolute", b.borderRadius = c ? `\n            ${D()}% ${D()}% \n            ${D()}% ${D()}%\n            ` : r + "%", b.top = C + "px", b.left = $ + "px", b.opacity = n ? x : 1, t && (b.width = t + "px", b.height = t + "px"), a && (y = Math.floor(Math.random() * t), b.width = y + "px", b.height = y + "px"), i) {
            z = "0123456789ABCDEF", g = "#";
            for (var L = 0; L < 6; L++) g += "0123456789ABCDEF" [Math.floor(16 * Math.random())];
            b.background = g
        } else e.secondColor ? b.background = o % 2 == 0 ? e.firstColor : e.secondColor : b.background = e.firstColor;
        if ("none" !== l) {
            function v() {
                "float" !== l && "blobs" !== l || setTimeout(function t() {
                    _ = !1;
                    let e = Math.floor(Math.random() * s) + s / 2;
                    S = M[o].style, !1 === _ && (S.top = Math.floor(Math.random() * adogo) + "px", S.left = Math.floor(Math.random() * h) + "px", "float" === l && (S.transition = `${e}s top ease-in-out, ${e}s left ease-in-out`), "blobs" === l && (S.transition = `\n                            ${e}s border-radius ease-in-out, ${e}s top ease-in-out, ${e}s left ease-in-out`, S.borderRadius = `\n                            ${D()}% ${D()}% \n                            ${D()}% ${D()}%\n                            `)), !0 === d && setTimeout(() => {
                        !0 === (_ = !0) && (M[o].style.top = Math.floor(Math.random() * adogo) + "px", M[o].style.left = Math.floor(Math.random() * h) + "px", _ = !1, t())
                    }, 1e3 * e)
                }, 1)
            }
            v()
        }
    }
  };

}
