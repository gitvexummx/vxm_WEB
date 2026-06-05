# VEXUM MX - DESIGN SYSTEM v2.0

## 🎨 IDENTIDAD VISUAL

### Paleta de Colores Oficial
```css
--neon-primary: #D946EF;      /* Púrpura */
--neon-secondary: #F97316;    /* Naranja rosado */
--dark-900: #05050A;          /* Negro espacial */
--dark-800: #0a0a0f;
--dark-700: #1a1a25;
--dark-600: #252532;
```

### Tipografía
- **Títulos**: Space Grotesk (Google Fonts) - weights: 600, 700
- **Cuerpo**: Inter (Google Fonts) - weights: 400, 500, 600
- **Tracking**: Títulos -0.02em, Body normal
- **Line-height**: Títulos 1.2-1.4, Body 1.75

### Jerarquía Tipográfica
| Elemento | Mobile | Desktop | Weight | Tracking |
|----------|--------|---------|--------|----------|
| H1 | 4xl (2.25rem) | 6xl (3.75rem) | 700 | -0.02em |
| H2 | 3xl (1.875rem) | 4xl (2.25rem) | 600 | -0.02em |
| H3 | xl (1.25rem) | 2xl (1.5rem) | 600 | normal |
| Body | base (1rem) | base (1rem) | 400 | normal |
| Muted | sm (0.875rem) | sm (0.875rem) | 400 | normal |

## 🏗️ LAYOUT

### Navbar
- **Height**: 72px desktop, 64px mobile
- **Background**: bg-slate-900/80 backdrop-blur-md
- **Border**: border-white/10
- **Position**: Fixed top-0 z-50

### Sidebar Móvil
- **Dirección**: Slide desde derecha
- **Overlay**: bg-black/60 backdrop-blur-sm
- **Ancho**: 72 (18rem)
- **Animación**: 300ms ease-in-out

### Footer
- **Columnas**: 3 (Logo+desc, Links, Redes)
- **Padding**: py-12 px-4
- **Background**: dark-900 con border superior sutil

## ✨ MICRO-INTERACCIONES

### Hover States
| Componente | Base | Hover | Transición |
|------------|------|-------|------------|
| Card | border-white/10 | border-neon-primary/30 + scale(1.02) + glow | 300ms cubic-bezier |
| Button Primary | gradient + shadow-lg | shadow-xl + translateY(-2px) | 200ms ease-out |
| Link Navbar | text-gray-300 | text-neon-primary + glow sutil | 150ms linear |
| Input | border-dark-600 | border-neon-primary/50 + focus-ring | 200ms ease |

### Duraciones
- **Fast**: 150ms
- **Base**: 300ms
- **Slow**: 500ms

### Glassmorphism Levels
- **Light**: rgba(255,255,255,0.03) + blur-sm
- **Medium**: rgba(255,255,255,0.05) + blur-md
- **Heavy**: rgba(255,255,255,0.08) + blur-lg

## 🎭 3D ELEMENTS

### Icosahedro Hero
- **Geometría**: IcosahedronGeometry(1.5, 0)
- **Líneas**: LineSegments con EdgesGeometry, color #D946EF, opacity 0.9
- **Caras**: Transparentes (opacity 0.01 o eliminadas)
- **Glow**: emissiveIntensity={2}, bloom post-processing si performance lo permite
- **Interacción**: 
  - Desktop: Parallax con mouse + autoRotate
  - Mobile: Solo autoRotate, opacidad 0.8

## 📱 RESPONSIVE STRATEGY

### Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

### Elementos 3D por Dispositivo
| Elemento | Desktop | Mobile |
|----------|---------|--------|
| Icosahedro Hero | ✅ Interactivo | ✅ Auto-rotate only |
| Partículas fondo | ❌ Ocultar | ❌ Ocultar |
| Glow orbs | ❌ Ocultar | ❌ Ocultar |

## 🧩 COMPONENTES

### Servicios JSON
- **Ubicación**: /public/data/services.json
- **Estructura**: 8 servicios oficiales con subservicios
- **Uso**: Carrusel Home + Página Servicios + [slug] dinámico

### Testimonios
- **Campos**: id, stars (5), name, role, photo (SVG default si vacío), lead (testimonio)
- **Layout**: Grid 3 columnas desktop, 1 mobile

### Formulario Contacto
- **Labels**: text-gray-400 (opacidad ~60%)
- **Campo alcaldía/municipio**: Select dinámico según ubicación
- **Toast error**: Flotante top-right con borde rojo neón

## 🎯 BACKGROUNDS POR SECCIÓN

### Hero
- Dot pattern 5% + radial gradient breathing
- Gradiente: radial-gradient(circle at 30% 20%, rgba(217,70,239,0.08))

### Stats/About
- dark-900 con grid pattern sutil

### Servicios
- dark-800 con blur orbs en esquinas

### Testimonios
- Dot pattern + radial gradient secundario

### CTA Final
- Gradient radial intenso centrado

## 🔧 UTILIDADES CSS

### Clases Personalizadas
```css
.neon-glow { text-shadow: 0 0 10px rgba(217,70,239,0.5)... }
.glass-light { background: rgba(255,255,255,0.03); backdrop-filter: blur(8px); }
.glass-medium { background: rgba(255,255,255,0.05); backdrop-filter: blur(12px); }
.glass-heavy { background: rgba(255,255,255,0.08); backdrop-filter: blur(16px); }
.border-neon-sutil { border-color: rgba(217,70,239,0.1); }
.border-neon-medio { border-color: rgba(217,70,239,0.2); }
.shadow-glow-sutil { box-shadow: 0 0 10px rgba(217,70,239,0.3); }
.shadow-glow-medio { box-shadow: 0 0 20px rgba(217,70,239,0.4); }
```

## 🚀 PERFORMANCE

### Optimizaciones
- Dynamic imports para componentes 3D (ssr: false)
- will-change en elementos animados
- dpr={[1, 2]} en Canvas 3D
- Lazy loading en imágenes stock
- Animaciones solo en secciones clave (hero, servicios, testimonios, CTA)

### No Analytics propios (usar CloudFlare)

---

**Última actualización**: Design Thinking Session 2024
**Estado**: En implementación
