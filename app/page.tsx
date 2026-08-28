'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef } from 'react'
import { ArrowDownRight, ArrowUpRight, Mail, MoveUpRight, Sparkles } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const HeroScene = dynamic(() => import('@/components/portfolio/hero-scene'), { ssr: false })
gsap.registerPlugin(ScrollTrigger)

const projects = [
  { title: 'NOVA / OS', type: 'AI OPERATING SYSTEM', year: '2025', className: 'project-lime', number: '01', tag: 'PRODUCT / SYSTEMS' },
  { title: 'KINETIC', type: 'DIGITAL EXPERIENCE', year: '2024', className: 'project-purple', number: '02', tag: 'WEBGL / MOTION' },
  { title: 'FRAMED', type: 'CREATIVE TOOLKIT', year: '2024', className: 'project-blue', number: '03', tag: 'TOOLS / CULTURE' },
]
const developers = [
  { name: 'Maya Chen', role: 'Creative Technologist', code: 'MC', hue: 'lime' },
  { name: 'Eli Navarro', role: 'Product Engineer', code: 'EN', hue: 'purple' },
  { name: 'Zoe Okafor', role: 'Experience Designer', code: 'ZO', hue: 'blue' },
]
const stack = ['React / Next.js', 'TypeScript', 'Three.js / WebGL', 'GSAP Motion', 'Node.js', 'Product Design']

export default function Page() {
  const root = useRef<HTMLElement>(null)
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (!reduce) {
        gsap.from('.hero-kicker, .hero-title, .hero-copy, .hero-actions', { y: 45, opacity: 0, duration: 1, stagger: 0.12, ease: 'power3.out' })
        gsap.utils.toArray<HTMLElement>('.reveal').forEach((el) => gsap.from(el, { y: 55, opacity: 0, duration: 0.85, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 84%' } }))
        gsap.utils.toArray<HTMLElement>('.project-card').forEach((el) => gsap.from(el, { y: 70, opacity: 0, duration: 0.9, scrollTrigger: { trigger: el, start: 'top 88%' } }))
        gsap.utils.toArray<HTMLElement>('.parallax-art').forEach((el) => gsap.to(el, { yPercent: -10, ease: 'none', scrollTrigger: { trigger: el, scrub: true } }))
      }
      const cursor = document.querySelector<HTMLElement>('.cursor')
      const move = (e: MouseEvent) => cursor && gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.32, ease: 'power2.out' })
      window.addEventListener('mousemove', move)
      gsap.utils.toArray<HTMLElement>('.magnetic').forEach((el) => {
        const enter = () => cursor?.classList.add('cursor-active')
        const leave = () => { cursor?.classList.remove('cursor-active'); gsap.to(el, { x: 0, y: 0, duration: .4 }) }
        const magnet = (e: MouseEvent) => { const r = el.getBoundingClientRect(); gsap.to(el, { x: (e.clientX - (r.left + r.width / 2)) * .16, y: (e.clientY - (r.top + r.height / 2)) * .16, duration: .35 }) }
        el.addEventListener('mouseenter', enter); el.addEventListener('mouseleave', leave); el.addEventListener('mousemove', magnet)
      })
      return () => window.removeEventListener('mousemove', move)
    }, root)
    return () => ctx.revert()
  }, [])

  return <main ref={root} className="portfolio-shell">
    <div className="cursor" aria-hidden="true" />
    <nav className="site-nav"><a className="brand magnetic" href="#top">TEEN<span>TECH</span></a><div className="nav-links"><a href="#work">Work</a><a href="#team">Team</a><a href="#experience">Experience</a><a href="#contact">Contact</a></div><a className="nav-status magnetic" href="#contact"><span /> Open to ideas</a></nav>
    <section id="top" className="hero section-pad"><div className="hero-content"><p className="eyebrow hero-kicker"><Sparkles size={14} /> Independent creative technology team</p><h1 className="hero-title">We make<br /><em>digital</em><br /><span>feel alive.</span></h1><p className="hero-copy">Teen Tech is a small, sharp team of developers and designers building high-fidelity products, immersive worlds, and impossible-feeling interfaces.</p><div className="hero-actions"><a className="button magnetic" href="#work">Explore work <ArrowUpRight size={17} /></a><a className="text-link" href="#contact">Start a project <span>↗</span></a></div></div><HeroScene /><div className="hero-foot"><span>Scroll to explore</span><span className="line" /><span>01 — 05</span></div></section>
    <section id="work" className="work section-pad"><div className="section-head reveal"><p className="eyebrow">Selected work / 2022—25</p><h2>Built for the<br /><span>curious.</span></h2><p className="section-note">We partner with ambitious people to turn the complex into experiences that feel obvious in hindsight.</p></div><div className="projects">{projects.map((project) => <article className={`project-card ${project.className}`} key={project.title}><div className="project-art"><div className="parallax-art"><div className="art-orb" /><div className="art-grid" /></div><span className="project-number">{project.number}</span><span className="project-tag">{project.tag}</span><MoveUpRight className="project-arrow" /></div><div className="project-meta"><div><p className="project-type">{project.type}</p><h3>{project.title}</h3></div><p className="project-year">{project.year}</p></div></article>)}</div></section>
    <section id="team" className="team section-pad"><div className="section-head reveal"><p className="eyebrow">Meet the developers</p><h2>Small team.<br /><span>Big energy.</span></h2><p className="section-note">Three perspectives, one shared obsession: making digital things worth remembering.</p></div><div className="developer-grid">{developers.map((dev) => <article className={`developer-card ${dev.hue}`} key={dev.name}><div className="developer-avatar">{dev.code}<span>+</span></div><div><h3>{dev.name}</h3><p>{dev.role}</p></div><ArrowUpRight size={19} /></article>)}</div></section>
    <section id="experience" className="experience section-pad"><div className="section-head reveal"><p className="eyebrow">Collective experience</p><h2>Sharp tools.<br /><span>Soft edges.</span></h2></div><div className="timeline">{['2025 — Now|Building playful intelligence at the edge of what browsers can do.', '2023 — 24|Shipping worlds for teams who refuse the default.', '2021 — 22|Learning that the best code is invisible when it works.'].map((item, i) => { const [year, copy] = item.split('|'); return <div className="timeline-row reveal" key={year}><span>{year}</span><strong>{String(i + 1).padStart(2, '0')}</strong><p>{copy}</p></div> })}</div><div className="stack-list">{stack.map((item, i) => <div className="stack-item reveal" key={item}><span>0{i + 1}</span><strong>{item}</strong><ArrowUpRight size={18} /></div>)}</div></section>
    <section id="contact" className="contact section-pad"><div><p className="eyebrow reveal">Have a good one?</p><h2 className="reveal">Let&apos;s make<br /><span>something</span><br />strange.</h2></div><form className="contact-form reveal" onSubmit={(e) => e.preventDefault()}><label>Name<input required placeholder="Your name" /></label><label>Email<input required type="email" placeholder="you@company.com" /></label><label>What are we making?<textarea required placeholder="Tell us a little about the idea..." rows={3} /></label><button className="button magnetic" type="submit">Send transmission <ArrowDownRight size={18} /></button></form></section>
    <footer><span>© 2025 Teen Tech</span><div><a href="https://github.com" aria-label="GitHub">GH</a><a href="https://linkedin.com" aria-label="LinkedIn">in</a></div><span>Made with intent / everywhere</span></footer>
  </main>
}
