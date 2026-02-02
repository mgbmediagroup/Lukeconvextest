"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { useMemo, useRef, useEffect } from "react";
import * as THREE from "three";

gsap.registerPlugin(SplitText);

// Vanilla Three.js shader background (no React Three Fiber to avoid reconciler errors)
function ShaderBackground({ className = "w-full h-full" }) {
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!containerRef.current) return;

		const container = containerRef.current;
		const scene = new THREE.Scene();
		const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
		
		const renderer = new THREE.WebGLRenderer({ antialias: true });
		renderer.setSize(container.clientWidth, container.clientHeight);
		container.appendChild(renderer.domElement);

		// Shader uniforms
		const uniforms = {
			u_time: { value: 0 },
			u_resolution: { value: new THREE.Vector3(container.clientWidth, container.clientHeight, 1.0) },
		};

		// Vertex Shader
		const vertexShader = `
			varying vec2 vUv;
			void main() {
				vUv = uv;
				gl_Position = vec4(position, 1.0);
			}
		`;

		// Fragment Shader (infinite road effect)
		const fragmentShader = `
			precision highp float;

			varying vec2 vUv;
			uniform float u_time;
			uniform vec3 u_resolution;

			#define STEP 256
			#define EPS .001

			float smin( float a, float b, float k )
			{
				float h = clamp( 0.5+0.5*(b-a)/k, 0.0, 1.0 );
				return mix( b, a, h ) - k*h*(1.0-h);
			}

			const mat2 m = mat2(.8,.6,-.6,.8);

			float noise( in vec2 x )
			{
				return sin(1.5*x.x)*sin(1.5*x.y);
			}

			float fbm6( vec2 p )
			{
				float f = 0.0;
				f += 0.500000*(0.5+0.5*noise( p )); p = m*p*2.02;
				f += 0.250000*(0.5+0.5*noise( p )); p = m*p*2.03;
				f += 0.125000*(0.5+0.5*noise( p )); p = m*p*2.01;
				f += 0.062500*(0.5+0.5*noise( p )); p = m*p*2.04;
				f += 0.015625*(0.5+0.5*noise( p ));
				return f/0.96875;
			}

			mat2 getRot(float a)
			{
				float sa = sin(a), ca = cos(a);
				return mat2(ca,-sa,sa,ca);
			}

			vec3 _position;

			float sphere(vec3 center, float radius)
			{
				return distance(_position,center) - radius;
			}

			float swingPlane(float height)
			{
				vec3 pos = _position + vec3(0.,0.,u_time * 5.5);
				float def =  fbm6(pos.xz * .25) * 0.5;
				
				float way = pow(abs(pos.x) * 34. ,2.5) *.0000125;
				def *= way;
				
				float ch = height + def;
				return max(pos.y - ch,0.);
			}

			float map(vec3 pos)
			{
				_position = pos;
				
				float dist;
				dist = swingPlane(0.);
				
				float sminFactor = 5.25;
				dist = smin(dist,sphere(vec3(0.,-15.,80.),60.),sminFactor);
				return dist;
			}

			vec3 getNormal(vec3 pos)
			{
				vec3 nor = vec3(0.);
				vec3 vv = vec3(0.,1.,-1.)*.01;
				nor.x = map(pos + vv.zxx) - map(pos + vv.yxx);
				nor.y = map(pos + vv.xzx) - map(pos + vv.xyx);
				nor.z = map(pos + vv.xxz) - map(pos + vv.xxy);
				nor /= 2.;
				return normalize(nor);
			}

			void mainImage( out vec4 fragColor, in vec2 fragCoord )
			{
				vec2 uv = (fragCoord.xy-.5*u_resolution.xy)/u_resolution.y;
				
				vec3 rayOrigin = vec3(uv + vec2(0.,6.), -1. );
				
				vec3 rayDir = normalize(vec3(uv , 1.));
				
				rayDir.zy = getRot(.15) * rayDir.zy;
				
				vec3 position = rayOrigin;
				
				float curDist;
				int nbStep = 0;
				
				for(; nbStep < STEP;++nbStep)
				{
					curDist = map(position);
					
					if(curDist < EPS)
						break;
					position += rayDir * curDist * .5;
				}
				
				float f;
				
				float dist = distance(rayOrigin,position);
				f = dist /(98.);
				f = float(nbStep) / float(STEP);
				
				f *= .9;
				vec3 col = vec3(f);
				
				fragColor = vec4(col,1.0);
			}

			void main() {
				vec4 fragColor;
				vec2 fragCoord = vUv * u_resolution.xy;
				mainImage(fragColor, fragCoord);
				gl_FragColor = fragColor;
			}
		`;

		const geometry = new THREE.PlaneGeometry(2, 2);
		const material = new THREE.ShaderMaterial({
			vertexShader,
			fragmentShader,
			uniforms,
			side: THREE.DoubleSide,
			depthTest: false,
			depthWrite: false,
		});

		const mesh = new THREE.Mesh(geometry, material);
		scene.add(mesh);

		// Animation loop
		const clock = new THREE.Clock();
		const animate = () => {
			uniforms.u_time.value = clock.getElapsedTime() * 0.5;
			renderer.render(scene, camera);
			requestAnimationFrame(animate);
		};
		animate();

		// Handle resize
		const handleResize = () => {
			const width = container.clientWidth;
			const height = container.clientHeight;
			renderer.setSize(width, height);
			uniforms.u_resolution.value.set(width, height, 1.0);
		};
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
			container.removeChild(renderer.domElement);
			renderer.dispose();
			geometry.dispose();
			material.dispose();
		};
	}, []);

	return <div ref={containerRef} className={className} />;
}

export default function InfiniteHero() {
	const rootRef = useRef<HTMLDivElement>(null);
	const bgRef = useRef<HTMLDivElement>(null);
	const h1Ref = useRef<HTMLHeadingElement>(null);
	const pRef = useRef<HTMLParagraphElement>(null);
	const ctaRef = useRef<HTMLDivElement>(null);

	const scrollToSection = () => {
		const element = document.getElementById('about-mgb');
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
		}
	};

	useGSAP(
		() => {
			const ctas = ctaRef.current ? Array.from(ctaRef.current.children) : [];

			const h1Split = new SplitText(h1Ref.current, { type: "lines" });
			const pSplit = new SplitText(pRef.current, { type: "lines" });

			gsap.set(bgRef.current, { filter: "blur(28px)" });
			gsap.set(h1Split.lines, {
				opacity: 0,
				y: 24,
				filter: "blur(8px)",
			});
			gsap.set(pSplit.lines, {
				opacity: 0,
				y: 16,
				filter: "blur(6px)",
			});
			if (ctas.length) gsap.set(ctas, { opacity: 0, y: 16 });

			const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
			tl.to(bgRef.current, { filter: "blur(0px)", duration: 1.2 }, 0)
				.to(
					h1Split.lines,
					{
						opacity: 1,
						y: 0,
						filter: "blur(0px)",
						duration: 0.8,
						stagger: 0.1,
					},
					0.3,
				)
				.to(
					pSplit.lines,
					{
						opacity: 1,
						y: 0,
						filter: "blur(0px)",
						duration: 0.6,
						stagger: 0.08,
					},
					"-=0.3",
				)
				.to(ctas, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 }, "-=0.2");

			return () => {
				h1Split.revert();
				pSplit.revert();
			};
		},
		{ scope: rootRef },
	);

	return (
		<div
			ref={rootRef}
			className="relative h-svh w-full overflow-hidden bg-black text-white"
		>
			<div className="absolute inset-0" ref={bgRef}>
				<ShaderBackground className="h-full w-full" />
			</div>

			<div className="pointer-events-none absolute inset-0 [background:radial-gradient(120%_80%_at_50%_50%,_transparent_40%,_black_100%)]" />

			<div className="relative z-10 flex h-svh w-full items-center justify-center px-6">
				<div className="text-center">
					<h1
						ref={h1Ref}
						className="mx-auto max-w-2xl lg:max-w-4xl text-[clamp(2.25rem,6vw,4rem)] font-extralight leading-[0.95] tracking-tight"
					>
						Design That Feels. Experiences That Resonate.
					</h1>
					<p
						ref={pRef}
						className="mx-auto mt-4 max-w-2xl md:text-balance text-sm/6 md:text-base/7 font-light tracking-tight text-white/70"
					>
						We blend creativity, emotion, and innovation to create digital worlds that your audience can connect with. Whether through intuitive interfaces, immersive 3D, or bold visual storytelling.
					</p>

					<div
						ref={ctaRef}
						className="mt-8 flex flex-row items-center justify-center gap-4"
					>
						<button
							type="button"
							onClick={scrollToSection}
							className="group relative overflow-hidden border border-white/30 bg-gradient-to-r from-white/20 to-white/10 px-4 py-2 text-sm rounded-lg font-medium tracking-wide text-white backdrop-blur-sm transition-[border-color,background-color,box-shadow] duration-500 hover:border-white/50 hover:bg-white/20 hover:shadow-lg hover:shadow-white/10 cursor-pointer"
						>
							Learn more
						</button>

						<button
							type="button"
							onClick={() => {
								const element = document.getElementById('portfolio');
								if (element) {
									element.scrollIntoView({ behavior: 'smooth' });
								}
							}}
							className="group relative px-4 py-2 text-sm font-medium tracking-wide text-white/90 transition-[filter,color] duration-500 hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.6)] hover:text-white cursor-pointer"
						>
							View portfolio
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}