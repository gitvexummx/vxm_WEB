# Vexum MX - Plataforma Tecnológica

## Descripción
Plataforma web moderna con experiencias 3D, animaciones avanzadas y arquitectura hexagonal.

## Stack Tecnológico
- **Framework**: Next.js 16.2.7 (App Router)
- **Lenguaje**: TypeScript 5.7+
- **Estilos**: Tailwind CSS 3.4+
- **3D**: Three.js + React Three Fiber + Drei
- **Animaciones**: Framer Motion
- **Base de datos**: Supabase
- **Validación**: Zod
- **Iconos**: Lucide React

## Requisitos Previos
- Node.js >= 20.0.0
- npm >= 11.0.0

## Instalación

```bash
# Clonar el repositorio
git clone <url-del-repositorio>
cd vexum-mx

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con las credenciales de Supabase

# Iniciar servidor de desarrollo
npm run dev
```

## Scripts Disponibles

```bash
npm run dev          # Iniciar servidor de desarrollo
npm run build        # Compilar para producción
npm run start        # Iniciar servidor de producción
npm run lint         # Ejecutar linter
npm run lint:fix     # Corregir errores de linting
npm run type-check   # Verificación de tipos TypeScript
npm run format       # Formatear código con Prettier
npm run format:check # Verificar formato sin modificar
```

## Estructura del Proyecto

```
vexum-mx/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/                # API Routes
│   │   ├── about/              # Página Acerca de
│   │   ├── services/           # Página Servicios
│   │   ├── success/            # Página Éxito
│   │   ├── testimonials/       # Página Testimonios
│   │   ├── globals.css         # Estilos globales
│   │   ├── layout.tsx          # Layout principal
│   │   └── page.tsx            # Página Home
│   ├── core/                   # Arquitectura Hexagonal - Núcleo
│   │   ├── entities/           # Entidades de dominio
│   │   └── ports/              # Interfaces/Contratos
│   ├── infrastructure/         # Infraestructura
│   │   ├── supabase/           # Cliente Supabase
│   │   └── repositories/       # Implementaciones de repositorios
│   ├── application/            # Lógica de aplicación
│   │   ├── usecases/           # Casos de uso
│   │   └── validators/         # Validadores Zod
│   ├── presentation/           # Capa de presentación
│   │   ├── components/
│   │   │   ├── ui/             # Componentes UI atómicos
│   │   │   ├── 3d/             # Componentes 3D
│   │   │   └── layout/         # Layout components
│   │   └── hooks/              # Custom hooks
│   └── styles/                 # Estilos adicionales
├── public/
│   └── assets/
│       ├── models/             # Modelos 3D (.glb, .gltf)
│       ├── images/             # Imágenes
│       └── icons/              # Iconos
├── .env.example                # Variables de entorno de ejemplo
├── .env.local                  # Variables de entorno locales (no commitear)
├── next.config.js              # Configuración Next.js
├── tailwind.config.ts          # Configuración Tailwind CSS
├── tsconfig.json               # Configuración TypeScript
└── package.json
```

## Arquitectura Hexagonal

El proyecto sigue la arquitectura hexagonal (puertos y adaptadores):

1. **Core (Dominio)**: Entidades y reglas de negocio puras
2. **Ports (Puertos)**: Interfaces que definen contratos
3. **Application (Casos de Uso)**: Lógica de aplicación
4. **Infrastructure (Adaptadores)**: Implementaciones concretas (Supabase, etc.)
5. **Presentation (UI)**: Componentes React y hooks

## Variables de Entorno

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anonima

# Aplicación
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

## Características

- ✅ Diseño responsive mobile-first
- ✅ Modo oscuro por defecto con soporte para modo claro
- ✅ Animaciones fluidas con Framer Motion
- ✅ Renderizado 3D con Three.js
- ✅ Optimización de imágenes Next.js
- ✅ SEO optimizado con metadata dinámica
- ✅ Accesibilidad (WCAG 2.1)
- ✅ Tipado estricto con TypeScript

## Contribución

1. Crear rama feature (`git checkout -b feature/nueva-funcionalidad`)
2. Commit cambios (`git commit -m 'feat: agregar nueva funcionalidad'`)
3. Push a la rama (`git push origin feature/nueva-funcionalidad`)
4. Abrir Pull Request

## Licencia

MIT License - ver LICENSE para más detalles.

## Contacto

- Website: https://vexum.mx
- Email: contacto@vexum.mx
